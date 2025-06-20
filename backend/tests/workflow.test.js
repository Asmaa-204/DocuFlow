const request = require("supertest");
const app = require("../src/app");
const db = require("../src/models");
const dotenv = require("dotenv")

dotenv.config()

let adminToken = "";

beforeAll(async () => {
  await db.sequelize.sync({ force: true });

  // Create an admin user and login
  await request(app).post("/api/v1/auth/signup").send({
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    password: "admin123",
    role: "administrator"
  });

  const loginRes = await request(app).post("/api/v1/auth/login").send({
    email: "admin@example.com",
    password: "admin123"
  });

  adminToken = loginRes.body.data.token;
});

afterAll(async () => {
  await db.sequelize.close();
});

describe("Workflow Endpoints", () => {
  test("POST /workflow - should create workflow with valid stages", async () => {
    const res = await request(app)
      .post("/api/v1/workflow")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Graduation Approval Flow",
        description: "A multi-stage approval process.",
        stages: [
          {
            title: "Professor Approval",
            description: "Initial check",
            role: "professor",
            stageOrder: 1
          },
          {
            title: "Department Manager Approval",
            description: "Department-level check",
            role: "department_manager",
            stageOrder: 2
          },
          {
            title: "Admin Final Approval",
            description: "Final decision",
            role: "administrator",
            stageOrder: 3
          }
        ]
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.data.workflow).toHaveProperty("id");
  });

  test("POST /workflow - should fail with duplicate stageOrder", async () => {
    const res = await request(app)
      .post("/api/v1/workflow")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Duplicate StageOrder Test",
        stages: [
          {
            title: "Stage 1",
            role: "professor",
            stageOrder: 1
          },
          {
            title: "Stage 2",
            role: "professor",
            stageOrder: 1 // duplicate
          }
        ]
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Duplicate stageOrder/i);
  });

  test("POST /workflow - should fail with non-sequential stageOrder", async () => {
    const res = await request(app)
      .post("/api/v1/workflow")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Non-sequential StageOrder Test",
        stages: [
          {
            title: "Stage 1",
            role: "professor",
            stageOrder: 1
          },
          {
            title: "Stage 3",
            role: "department_manager",
            stageOrder: 3
          }
        ]
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/stageOrder values must be sequential/i);
  });

  test("GET /workflow - should return all workflows", async () => {
    const res = await request(app)
      .get("/api/v1/workflow")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(Array.isArray(res.body.data.workflows)).toBe(true);
  });
});
