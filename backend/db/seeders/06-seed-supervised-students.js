const { eq } = require("drizzle-orm");
const { db, schema } = require("../../src/db");

module.exports = {
  async up() {
    await db.delete(schema.supervisedStudents);

    const professors = await db.query.users.findMany({
      where: eq(schema.users.role, "professor"),
    });
    const students = await db.query.students.findMany({
      columns: { code: true },
    });

    if (!professors.length || !students.length) {
      console.log("Skipping supervised-students seed - missing required data");
      return;
    }

    const rows = [];
    let cursor = 0;
    for (const prof of professors) {
      for (let k = 0; k < 3 && cursor < students.length; k++, cursor++) {
        rows.push({ userId: prof.id, studentCode: students[cursor].code });
      }
      if (cursor >= students.length) cursor = 0; // wrap around
    }

    if (rows.length) await db.insert(schema.supervisedStudents).values(rows);
    console.log(`Seeded ${rows.length} supervised-student links.`);
  },
};
