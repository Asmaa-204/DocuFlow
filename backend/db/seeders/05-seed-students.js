const { db, schema } = require("../../src/db");

module.exports = {
  async up() {
    // Idempotent re-seed
    await db.delete(schema.students);

    const now = new Date();
    const oneYearAhead = new Date(now);
    oneYearAhead.setFullYear(now.getFullYear() + 1);

    const rows = [];
    for (let i = 1; i <= 20; i++) {
      const code = `STU${String(i).padStart(4, "0")}`;
      rows.push({
        code,
        name: `Student ${i}`,
        registrationStart: now,
        registrationEnd: oneYearAhead,
      });
    }

    await db.insert(schema.students).values(rows);
    console.log(`Seeded ${rows.length} students.`);
  },
};
