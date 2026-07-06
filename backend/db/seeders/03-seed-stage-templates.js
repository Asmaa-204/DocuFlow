const { eq } = require("drizzle-orm");
const { db, schema } = require("../../src/db");

module.exports = {
  async up() {
    await db.delete(schema.conditions);

    const firstStages = await db.query.stages.findMany({
      where: eq(schema.stages.stageOrder, 1),
      columns: { id: true },
    });
    const templates = await db.query.templates.findMany({
      columns: { id: true, title: true },
    });

    if (!firstStages.length || !templates.length) {
      console.log("Skipping stage-template conditions - missing required data");
      return;
    }

    const supervisionTemplate = templates.find(
      (t) => t.title === "Request for Supervision",
    );
    if (!supervisionTemplate) return;

    const conditionsData = firstStages.map((stage) => ({
      stageId: stage.id,
      templateId: supervisionTemplate.id,
    }));

    if (conditionsData.length) {
      await db.insert(schema.conditions).values(conditionsData);
    }
    console.log(`Created ${conditionsData.length} stage-template conditions`);
  },
};
