const { eq } = require("drizzle-orm");
const { db, schema } = require("../db");
const AppError = require("../errors/AppError");
const ar = require("../translations/ar");

class DepartmentService {
  static async getAllDepartments() {
    return db.query.departments.findMany();
  }

  static async getDepartmentById(departmentId) {
    const department = await db.query.departments.findFirst({
      where: eq(schema.departments.id, Number(departmentId)),
    });
    if (!department) throw new AppError(ar.department.notFound, 404);
    return department;
  }

  static async createDepartment(data) {
    const { name, managerId, affairsEmployeeId } = data;

    if (managerId) {
      const manager = await db.query.users.findFirst({
        where: eq(schema.users.id, managerId),
      });
      if (!manager) throw new AppError(ar.department.managerNotFound, 404);
    }

    if (affairsEmployeeId) {
      const affairs = await db.query.users.findFirst({
        where: eq(schema.users.id, affairsEmployeeId),
      });
      if (!affairs)
        throw new AppError(ar.department.affairsEmployeeNotFound, 404);
    }

    const [department] = await db
      .insert(schema.departments)
      .values({ name, managerId, affairsEmployeeId })
      .returning();

    return department;
  }

  static async updateDepartment(departmentId, data) {
    const { name, managerId, affairsEmployeeId } = data;

    const department = await db.query.departments.findFirst({
      where: eq(schema.departments.id, Number(departmentId)),
    });
    if (!department) throw new AppError(ar.department.notFound, 404);

    if (managerId) {
      const manager = await db.query.users.findFirst({
        where: eq(schema.users.id, managerId),
      });
      if (!manager) throw new AppError(ar.department.managerNotFound, 404);
    }
    if (affairsEmployeeId) {
      const affairs = await db.query.users.findFirst({
        where: eq(schema.users.id, affairsEmployeeId),
      });
      if (!affairs)
        throw new AppError(ar.department.affairsEmployeeNotFound, 404);
    }

    const patch = {
      name: name ?? department.name,
      managerId: managerId ?? department.managerId,
      affairsEmployeeId: affairsEmployeeId ?? department.affairsEmployeeId,
    };

    const [updated] = await db
      .update(schema.departments)
      .set(patch)
      .where(eq(schema.departments.id, department.id))
      .returning();

    return updated;
  }
}

module.exports = DepartmentService;
