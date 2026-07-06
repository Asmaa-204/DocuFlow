const { eq, and, ne, inArray, asc, sql } = require("drizzle-orm");
const { db, schema } = require("../db");
const AppError = require("../errors/AppError");
const DrizzleQueryBuilder = require("../utils/DrizzleQueryBuilder");
const withTransaction = require("../utils/withTransaction");
const DocumentService = require("./document.service");
const ar = require("../translations/ar");

function computeRequestStatus(assignments) {
  if (!assignments || assignments.length === 0) return "draft";
  if (assignments.some((a) => a.status === "rejected")) return "rejected";
  if (assignments.every((a) => a.status === "approved")) return "approved";
  return "pending";
}

function attachDerived(request) {
  if (!request) return request;
  const plain = { ...request };
  plain.status = computeRequestStatus(plain.assignments);
  const pending = (plain.assignments || []).find((a) => a.status === "pending");
  plain.assignedToUserId = pending ? pending.assignedToUserId : null;
  return plain;
}

class RequestService {
  static ALLOWED_SORT_FIELDS = ["createdAt"];

  static _withDefault = {
    instance: { with: { workflow: { columns: { title: true } } } },
    documents: { columns: { id: true } },
    user: {
      columns: { firstName: true, lastName: true, profilePicture: true },
    },
    assignments: true,
  };

  static _transformRequest(request) {
    if (!request) return request;
    const plain = attachDerived(request);
    plain.workflowTitle = plain.instance?.workflow?.title || null;
    delete plain.instance;
    return plain;
  }

  static async _fetchRequests(query, extraCondition) {
    const DEFAULT_SORT = "-createdAt";
    const q = { ...(query || {}) };
    const searchSort = q.sort ? q.sort.replace("-", "") : DEFAULT_SORT;
    if (!this.ALLOWED_SORT_FIELDS.includes(searchSort)) q.sort = DEFAULT_SORT;

    const statusFilter = q.status;
    delete q.status;

    const builder = new DrizzleQueryBuilder(q, schema.requests);
    builder.filter().sort().attributes();
    if (extraCondition) builder.andWhere(extraCondition);

    if (statusFilter) {
      if (statusFilter === "draft") {
        builder.andWhere(
          sql`NOT EXISTS (
            SELECT 1 FROM "RequestAssignments" ra
            WHERE ra."requestId" = ${schema.requests.id}
          )`,
        );
      } else {
        builder.andWhere(
          sql`EXISTS (
            SELECT 1 FROM "RequestAssignments" ra
            WHERE ra."requestId" = ${schema.requests.id}
              AND ra."status" = ${statusFilter}
          )`,
        );
      }
    }

    const opts = builder.get();
    opts.with = this._withDefault;

    const rows = await db.query.requests.findMany(opts);
    return rows.map((r) => this._transformRequest(r));
  }

  static getAllRequests(query) {
    return this._fetchRequests(query);
  }

  static getUserSentRequests(userId, query) {
    const q = { ...(query || {}) };
    const hasStatusFilter = !!q.status;
    const condition = eq(schema.requests.userId, userId);
    if (!hasStatusFilter) {
      return this._fetchRequests(
        q,
        and(
          condition,
          sql`EXISTS (
            SELECT 1 FROM "RequestAssignments" ra
            WHERE ra."requestId" = ${schema.requests.id}
          )`,
        ),
      );
    }
    return this._fetchRequests(q, condition);
  }

  static getUserIncomingRequests(userId, query) {
    return this._fetchRequests(
      query,
      sql`EXISTS (
        SELECT 1 FROM "RequestAssignments" ra
        WHERE ra."requestId" = ${schema.requests.id}
          AND ra."assignedToUserId" = ${userId}
      )`,
    );
  }

  static async getRequest(requestId, query, user) {
    const builder = new DrizzleQueryBuilder(query, schema.requests);
    const opts = builder.attributes().get();
    opts.where = eq(schema.requests.id, Number(requestId));
    opts.with = this._withDefault;

    const request = await db.query.requests.findFirst(opts);
    if (!request) throw new AppError(ar.request.notFound, 404);

    const access = await db.query.accesses.findFirst({
      where: and(
        eq(schema.accesses.requestId, request.id),
        eq(schema.accesses.userId, user.id),
      ),
      columns: { accessLevel: true },
    });

    if (!access?.accessLevel && user.role !== "administrator") {
      throw new AppError(ar.request.noPermission, 403);
    }

    return this._transformRequest(request);
  }

  // ---------------------------------------------------------------------------
  // Resolve assignees for the next stage AFTER `currentStageOrder`.
  //
  // Rules:
  //   - If the next stage doesn't exist → return { nextStage: null, assignees: [] }
  //   - If the next stage is multi-approval and the instance has included
  //     professors → return them all as assignees.
  //   - If the next stage is multi-approval but the instance has NO included
  //     professors → SKIP that stage entirely, and re-run resolution starting
  //     from the stage after it. This is where the "skip empty special stage"
  //     rule lives.
  //   - Otherwise resolve a single assignee based on role (existing behaviour).
  //
  // Returns { nextStage, assignees }.
  // ---------------------------------------------------------------------------
  static async _resolveNextStageAndAssignees(instance, currentStageOrder, tx) {
    let cursor = currentStageOrder;
    // Bound the loop by number of stages in the workflow — cannot exceed it.
    while (true) {
      const nextStage = await tx.query.stages.findFirst({
        where: and(
          eq(schema.stages.workflowId, instance.workflowId),
          eq(schema.stages.stageOrder, cursor + 1),
        ),
      });

      if (!nextStage) return { nextStage: null, assignees: [] };

      if (nextStage.isMultiApproval) {
        const included = await tx.query.instanceProfessors.findMany({
          where: eq(schema.instanceProfessors.instanceId, instance.id),
          columns: { userId: true },
        });
        if (included.length === 0) {
          // Skip: the special stage is a no-op when no professors were included.
          cursor = nextStage.stageOrder;
          continue;
        }
        return {
          nextStage,
          assignees: included.map((r) => r.userId),
        };
      }

      // Regular single-assignee resolution
      if (nextStage.role === "department_manager") {
        const dep = await tx.query.departments.findFirst({
          where: eq(schema.departments.id, instance.departmentId),
          with: { manager: { columns: { id: true } } },
        });
        return {
          nextStage,
          assignees: dep?.manager ? [dep.manager.id] : [instance.userId],
        };
      }
      if (nextStage.role === "administrator") {
        const dep = await tx.query.departments.findFirst({
          where: eq(schema.departments.id, instance.departmentId),
          with: { affairsEmployee: { columns: { id: true } } },
        });
        return {
          nextStage,
          assignees: dep?.affairsEmployee
            ? [dep.affairsEmployee.id]
            : [instance.userId],
        };
      }
      // professor: back to the instance creator
      return { nextStage, assignees: [instance.userId] };
    }
  }

  static async createRequest(instanceId, note, userId, transaction) {
    const cb = async (tx) => {
      const instance = await tx.query.workflowInstances.findFirst({
        where: eq(schema.workflowInstances.id, Number(instanceId)),
        with: {
          stage: {
            with: {
              conditions: { with: { template: { columns: { id: true } } } },
            },
          },
        },
      });
      if (!instance) throw new AppError(ar.instance.notFound, 404);

      const [request] = await tx
        .insert(schema.requests)
        .values({
          instanceId,
          stageId: instance.stageId,
          note,
          userId,
        })
        .returning();

      await tx.insert(schema.accesses).values({
        requestId: request.id,
        userId,
        accessLevel: "edit",
      });

      const stageTemplateIds = (instance.stage.conditions || [])
        .map((c) => c.template?.id)
        .filter(Boolean);

      if (stageTemplateIds.length > 0) {
        await tx.insert(schema.documents).values(
          stageTemplateIds.map((tId) => ({
            templateId: tId,
            data: null,
            requestId: request.id,
          })),
        );
      }

      const createdDocuments = await tx.query.documents.findMany({
        where: eq(schema.documents.requestId, request.id),
        columns: { id: true },
      });

      request.documents = createdDocuments;
      request.assignments = [];
      return attachDerived(request);
    };

    if (transaction) return await cb(transaction);
    return await withTransaction(cb);
  }

  static async getRequestById(requestId) {
    const request = await db.query.requests.findFirst({
      where: eq(schema.requests.id, Number(requestId)),
      with: { assignments: true },
    });
    if (!request) throw new AppError(ar.request.notFound, 404);
    return attachDerived(request);
  }

  static async updateMyRequest(
    request,
    status,
    note,
    _assignedTo,
    transaction,
  ) {
    const cb = async (tx) => {
      const allowedStatuses = ["pending", "draft"];
      if (!allowedStatuses.includes(status)) {
        throw new AppError(ar.request.invalidStatus(status), 400);
      }

      if (note && note !== request.note) {
        await tx
          .update(schema.requests)
          .set({ note })
          .where(eq(schema.requests.id, request.id));
        request.note = note;
      }

      if (status === "pending") {
        const fullInstance = await tx.query.workflowInstances.findFirst({
          where: eq(schema.workflowInstances.id, request.instanceId),
          with: { stage: true },
        });
        if (!fullInstance) throw new AppError(ar.instance.notFound, 404);

        const { assignees } =
          await RequestService._resolveNextStageAndAssignees(
            fullInstance,
            fullInstance.stage.stageOrder,
            tx,
          );
        if (assignees.length === 0) {
          throw new AppError(ar.request.cannotSendNoAssignments, 400);
        }

        const documents = await tx.query.documents.findMany({
          where: eq(schema.documents.requestId, request.id),
        });
        await DocumentService.validateDocumentsData(documents, false);

        for (const assigneeId of assignees) {
          const existing = await tx.query.requestAssignments.findFirst({
            where: and(
              eq(schema.requestAssignments.requestId, request.id),
              eq(schema.requestAssignments.assignedToUserId, assigneeId),
            ),
          });
          if (existing) continue;

          await tx.insert(schema.requestAssignments).values({
            requestId: request.id,
            assignedToUserId: assigneeId,
            status: "pending",
          });

          const existingAccess = await tx.query.accesses.findFirst({
            where: and(
              eq(schema.accesses.requestId, request.id),
              eq(schema.accesses.userId, assigneeId),
            ),
          });
          if (existingAccess) {
            await tx
              .update(schema.accesses)
              .set({ accessLevel: "respond" })
              .where(
                and(
                  eq(schema.accesses.requestId, request.id),
                  eq(schema.accesses.userId, assigneeId),
                ),
              );
          } else {
            await tx.insert(schema.accesses).values({
              requestId: request.id,
              userId: assigneeId,
              accessLevel: "respond",
            });
          }
        }

        await tx
          .update(schema.accesses)
          .set({ accessLevel: "read" })
          .where(
            and(
              eq(schema.accesses.requestId, request.id),
              eq(schema.accesses.userId, request.userId),
            ),
          );

        if (!request.sentAt) {
          await tx
            .update(schema.requests)
            .set({ sentAt: new Date() })
            .where(eq(schema.requests.id, request.id));
        }
      }

      const updated = await tx.query.requests.findFirst({
        where: eq(schema.requests.id, request.id),
        with: { assignments: true },
      });
      return attachDerived(updated);
    };

    if (transaction) return await cb(transaction);
    return await withTransaction(cb);
  }

  static async advanceInstance(instanceId, transaction) {
    const cb = async (tx) => {
      const instance = await tx.query.workflowInstances.findFirst({
        where: eq(schema.workflowInstances.id, Number(instanceId)),
        with: { stage: true },
      });
      if (!instance) throw new AppError(ar.instance.notFound, 404);

      const { nextStage, assignees } =
        await RequestService._resolveNextStageAndAssignees(
          instance,
          instance.stage.stageOrder,
          tx,
        );

      if (nextStage) {
        await tx
          .update(schema.workflowInstances)
          .set({ stageId: nextStage.id })
          .where(eq(schema.workflowInstances.id, instance.id));

        // If there is yet another stage after nextStage, create the next request now
        const reloaded = await tx.query.workflowInstances.findFirst({
          where: eq(schema.workflowInstances.id, instance.id),
          with: { stage: true },
        });
        const { nextStage: afterNext } =
          await RequestService._resolveNextStageAndAssignees(
            reloaded,
            reloaded.stage.stageOrder,
            tx,
          );
        if (afterNext) {
          await RequestService.createRequest(
            instance.id,
            "",
            instance.userId,
            tx,
          );
        } else {
          await tx
            .update(schema.workflowInstances)
            .set({ status: "completed" })
            .where(eq(schema.workflowInstances.id, instance.id));
        }
      } else {
        await tx
          .update(schema.workflowInstances)
          .set({ status: "completed" })
          .where(eq(schema.workflowInstances.id, instance.id));
      }

      return await tx.query.workflowInstances.findFirst({
        where: eq(schema.workflowInstances.id, instance.id),
        with: { stage: true },
      });
    };

    if (transaction) return await cb(transaction);
    return await withTransaction(cb);
  }

  static async respondToRequest(
    request,
    newStatus,
    rejectionReason,
    user,
    transaction,
  ) {
    const cb = async (tx) => {
      const allowedStatuses = ["approved", "rejected"];
      if (!allowedStatuses.includes(newStatus)) {
        throw new AppError(ar.request.invalidResponseStatus, 400);
      }
      if (newStatus === "rejected" && !rejectionReason) {
        throw new AppError(ar.request.rejectionReasonRequired, 400);
      }

      const assignment = await tx.query.requestAssignments.findFirst({
        where: and(
          eq(schema.requestAssignments.requestId, request.id),
          eq(schema.requestAssignments.assignedToUserId, user.id),
        ),
      });
      if (!assignment) throw new AppError(ar.request.notAssignedToUser, 403);
      if (assignment.status !== "pending") {
        throw new AppError(ar.request.alreadyResponded, 400);
      }

      await tx
        .update(schema.requestAssignments)
        .set({
          status: newStatus,
          rejectionReason: newStatus === "rejected" ? rejectionReason : null,
        })
        .where(
          and(
            eq(schema.requestAssignments.requestId, request.id),
            eq(schema.requestAssignments.assignedToUserId, user.id),
          ),
        );

      const allAssignments = await tx.query.requestAssignments.findMany({
        where: eq(schema.requestAssignments.requestId, request.id),
      });
      const effectiveStatus = computeRequestStatus(allAssignments);

      if (effectiveStatus === "approved") {
        // Advance one stage, using the same skip-empty-multi-approval rules.
        const instance = await tx.query.workflowInstances.findFirst({
          where: eq(schema.workflowInstances.id, request.instanceId),
          with: { stage: true },
        });
        if (!instance) throw new AppError(ar.instance.notFound, 404);

        const { nextStage } =
          await RequestService._resolveNextStageAndAssignees(
            instance,
            instance.stage.stageOrder,
            tx,
          );

        if (nextStage) {
          await tx
            .update(schema.workflowInstances)
            .set({ stageId: nextStage.id })
            .where(eq(schema.workflowInstances.id, instance.id));

          // Create the next request only if there is another stage after that one.
          const reloaded = await tx.query.workflowInstances.findFirst({
            where: eq(schema.workflowInstances.id, instance.id),
            with: { stage: true },
          });
          const { nextStage: afterNext } =
            await RequestService._resolveNextStageAndAssignees(
              reloaded,
              reloaded.stage.stageOrder,
              tx,
            );
          if (afterNext) {
            if (nextStage.isMultiApproval) {
              const request = await RequestService.createRequest(
                instance.id,
                "",
                instance.userId,
                tx,
              );
              await RequestService.updateMyRequest(
                request,
                "pending",
                "",
                null,
                tx,
              );
            } else {
              await RequestService.createRequest(instance.id, "", user.id, tx);
            }
          } else {
            await tx
              .update(schema.workflowInstances)
              .set({ status: "completed" })
              .where(eq(schema.workflowInstances.id, instance.id));
          }
        } else {
          await tx
            .update(schema.workflowInstances)
            .set({ status: "completed" })
            .where(eq(schema.workflowInstances.id, instance.id));
        }
      } else if (effectiveStatus === "rejected") {
        await tx
          .update(schema.workflowInstances)
          .set({ status: "rejected" })
          .where(eq(schema.workflowInstances.id, request.instanceId));
      }

      const updated = await tx.query.requests.findFirst({
        where: eq(schema.requests.id, request.id),
        with: { assignments: true },
      });
      return attachDerived(updated);
    };

    if (transaction) return await cb(transaction);
    return await withTransaction(cb);
  }
}

module.exports = RequestService;
