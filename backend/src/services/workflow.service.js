const { eq, inArray, asc } = require("drizzle-orm");
const { db, schema } = require("../db");
const DrizzleQueryBuilder = require("../utils/DrizzleQueryBuilder");
const AppError = require("../errors/AppError");
const withTransaction = require("../utils/withTransaction");
const ar = require("../translations/ar");
const {
  validate: validateWorkflow,
} = require("../validators/workflow.validate");

class WorkflowService {
  static validRoles = ["professor", "department_manager", "administrator"];

  static async getAllWorkflows(query) {
    const { role, ...rest } = query || {};
    const builder = new DrizzleQueryBuilder(rest, schema.workflows);
    const opts = builder.filter().sort().attributes().get();

    opts.with = {
      stages: { orderBy: [asc(schema.stages.stageOrder)] },
    };

    let workflows = await db.query.workflows.findMany(opts);

    // Replicates `roleFilter` — first stage's role must match `role`
    if (role) {
      workflows = workflows.filter(
        (w) => w.stages?.[0]?.role === role && w.stages?.[0]?.stageOrder === 1,
      );
    }

    // Preserve old `filterByRole` alias so any consumer expecting it keeps working
    for (const w of workflows) w.filterByRole = w.stages;

    return workflows;
  }

  static async getWorkflow(workflowId, query) {
    const builder = new DrizzleQueryBuilder(query, schema.workflows);
    const opts = builder.attributes().get();
    opts.where = eq(schema.workflows.id, Number(workflowId));
    opts.with = {
      stages: { orderBy: [asc(schema.stages.stageOrder)] },
    };

    const workflow = await db.query.workflows.findFirst(opts);
    if (!workflow) throw new AppError(ar.workflow.notFound, 404);
    return workflow;
  }

  static async createWorkflow(title, description, stagesInput, transaction) {
    validateWorkflow({ title, description, stages: stagesInput });

    const cb = async (tx) => {
      const [workflow] = await tx
        .insert(schema.workflows)
        .values({ title, description })
        .returning();

      for (const stageInput of stagesInput) {
        const {
          title: st,
          stageOrder,
          role,
          templateIds,
          isMultiApproval,
        } = stageInput;

        const [stage] = await tx
          .insert(schema.stages)
          .values({
            title: st,
            stageOrder,
            role,
            workflowId: workflow.id,
            isMultiApproval: !!isMultiApproval,
          })
          .returning();

        const ids = templateIds || [];

        if (ids.length) {
          const foundTemplates = await tx.query.templates.findMany({
            where: inArray(schema.templates.id, ids),
          });
          if (foundTemplates.length !== ids.length) {
            throw new AppError(ar.workflow.invalidTemplateIds(st), 400);
          }
          await tx.insert(schema.conditions).values(
            foundTemplates.map((t) => ({
              stageId: stage.id,
              templateId: t.id,
            })),
          );
        }
      }

      return workflow;
    };

    if (transaction) return await cb(transaction);
    return await withTransaction(cb);
  }
}

module.exports = WorkflowService;
