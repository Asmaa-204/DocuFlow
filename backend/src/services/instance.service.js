const { eq, and, inArray, asc } = require("drizzle-orm");
const { db, schema } = require("../db");
const AppError = require("../errors/AppError");
const DrizzleQueryBuilder = require("../utils/DrizzleQueryBuilder");
const withTransaction = require("../utils/withTransaction");
const ar = require("../translations/ar");

class InstanceService {
  static async getAllInstances(query) {
    const builder = new DrizzleQueryBuilder(query, schema.workflowInstances);
    const opts = builder.filter().sort().attributes().get();
    return db.query.workflowInstances.findMany(opts);
  }

  static async getInstance(instanceId, query, user) {
    const builder = new DrizzleQueryBuilder(query, schema.workflowInstances);
    const opts = builder.attributes().get();
    opts.where = eq(schema.workflowInstances.id, Number(instanceId));
    opts.with = {
      stage: { columns: { stageOrder: true, isMultiApproval: true } },
      student: true,
      professors: {
        with: {
          user: {
            columns: {
              id: true,
              firstName: true,
              lastName: true,
              profilePicture: true,
            },
          },
        },
      },
    };

    const instance = await db.query.workflowInstances.findFirst(opts);
    if (!instance) throw new AppError(ar.instance.notFound, 404);

    if (user?.role !== "administrator" && instance.userId !== user.id) {
      throw new AppError(ar.instance.noPermission, 403);
    }
    return instance;
  }

  static async getUserInstances(userId, query) {
    const builder = new DrizzleQueryBuilder(query, schema.workflowInstances);
    builder.filter().sort().attributes();
    builder.andWhere(eq(schema.workflowInstances.userId, userId));
    const opts = builder.get();
    opts.with = {
      stage: { columns: { stageOrder: true, isMultiApproval: true } },
      student: true,
      professors: true,
    };

    return db.query.workflowInstances.findMany(opts);
  }

  static async createInstance(
    workflowId,
    user,
    departmentId,
    studentCode,
    professorIds,
  ) {
    if (!studentCode) throw new AppError(ar.instance.studentCodeRequired, 400);

    // professorIds is optional; when provided must be a distinct array of integers.
    if (professorIds !== undefined && !Array.isArray(professorIds)) {
      throw new AppError(ar.validation.professorIdsMustBeArray, 400);
    }
    const professorList = Array.isArray(professorIds)
      ? professorIds.map((n) => Number(n)).filter((n) => Number.isInteger(n))
      : [];
    if (new Set(professorList).size !== professorList.length) {
      throw new AppError(ar.instance.duplicateProfessorId, 400);
    }

    departmentId = departmentId || user.departmentId;

    const department = await db.query.departments.findFirst({
      where: eq(schema.departments.id, Number(departmentId)),
    });
    if (!department) throw new AppError(ar.instance.departmentNotFound, 404);

    const student = await db.query.students.findFirst({
      where: eq(schema.students.code, studentCode),
    });
    if (!student) throw new AppError(ar.instance.studentNotFound, 404);

    const workflow = await db.query.workflows.findFirst({
      where: eq(schema.workflows.id, Number(workflowId)),
      with: { stages: { orderBy: [asc(schema.stages.stageOrder)] } },
    });
    if (!workflow) throw new AppError(ar.workflow.notFound, 404);

    const firstStage = workflow.stages[0];
    if (firstStage.role !== user.role) {
      throw new AppError(
        ar.instance.cannotStartWorkflow(user.role, firstStage.role),
        403,
      );
    }

    let validProfessors = [];
    if (professorList.length) {
      validProfessors = await db.query.users.findMany({
        where: and(
          inArray(schema.users.id, professorList),
          eq(schema.users.role, "professor"),
        ),
        columns: { id: true },
      });
      if (validProfessors.length !== professorList.length) {
        // Find the offending id for a helpful error
        const validIds = new Set(validProfessors.map((p) => p.id));
        const bad = professorList.find((id) => !validIds.has(id));
        throw new AppError(ar.instance.invalidProfessorId(bad), 400);
      }
    }

    return await withTransaction(async (tx) => {
      const [instance] = await tx
        .insert(schema.workflowInstances)
        .values({
          workflowId,
          stageId: firstStage.id,
          userId: user.id,
          departmentId: department.id,
          studentId: student.code,
        })
        .returning();

      if (validProfessors.length) {
        await tx.insert(schema.instanceProfessors).values(
          validProfessors.map((p) => ({
            instanceId: instance.id,
            userId: p.id,
          })),
        );
      }

      return instance;
    });
  }
}

module.exports = InstanceService;
