const bcrypt = require("bcryptjs");
const { eq } = require("drizzle-orm");
const { db, schema } = require("../../src/db");

const departmentNames = [
  "Aeronautical and Aerospace Engineering",
  "Architectural Engineering",
  "Biomedical Engineering and Systems",
  "Chemical Engineering",
  "Computer Engineering",
  "Electrical Power Engineering",
  "Electronics and Communications",
  "Engineering Mathematics and Physics",
  "Irrigation and Hydraulics",
  "Mechanical Design and Production",
  "Mechanical Power Engineering",
  "Mining & Geological Engineering Program",
  "Petroleum Engineering Program",
  "Metallurgical Engineering Program",
  "Public Works",
  "Structural Engineering",
];

module.exports = {
  async up() {
    await db.delete(schema.users);
    await db.delete(schema.departments);

    const inserted = await db
      .insert(schema.departments)
      .values(departmentNames.map((name) => ({ name })))
      .returning();

    for (let i = 0; i < inserted.length; i++) {
      const dept = inserted[i];
      const pwd = await bcrypt.hash("password123", 8);

      const [manager] = await db
        .insert(schema.users)
        .values({
          firstName: `Manager${i + 1}`,
          lastName: "Manager",
          email: `manager${i + 1}@college.edu`,
          password: pwd,
          role: "department_manager",
          departmentId: dept.id,
        })
        .returning();

      const [affairs] = await db
        .insert(schema.users)
        .values({
          firstName: `Affairs${i + 1}`,
          lastName: "Affairs",
          email: `affairs${i + 1}@college.edu`,
          password: pwd,
          role: "administrator",
          departmentId: dept.id,
        })
        .returning();

      await db.insert(schema.users).values({
        firstName: `Professor${i + 1}`,
        lastName: "Professor",
        email: `professor${i + 1}@college.edu`,
        password: pwd,
        role: "professor",
        departmentId: dept.id,
      });

      await db
        .update(schema.departments)
        .set({ managerId: manager.id, affairsEmployeeId: affairs.id })
        .where(eq(schema.departments.id, dept.id));
    }
  },
};
