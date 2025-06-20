const request = require("supertest");
const app = require("../src/app");
const db = require("../src/models");
const dotenv = require("dotenv")

dotenv.config()

let professorToken = "";
let instanceId = null;
let workflowId = null;

beforeAll(async () => {
  await db.sequelize.sync({ force: true });

  // Create professor user and login
  await request(app).post("/api/v1/auth/signup").send({
    firstName: "Prof",
    lastName: "User",
    email: "prof@example.com",
    password: "prof123",
    role: "administrator"
  });

  const loginRes = await request(app).post("/api/v1/auth/login").send({
    email: "prof@example.com",
    password: "prof123"
  });

  professorToken = loginRes.body.data.token;

  // Create a workflow
  const workflowRes = await request(app)
    .post("/api/v1/workflow")
    .set("Authorization", `Bearer ${professorToken}`)
    .send({
      title: "Test Workflow",
      stages: [
        { title: "Stage 1", role: "administrator", stageOrder: 1 }
      ]
    });

  workflowId = workflowRes.body.data.workflow.id;
});

afterAll(async () => {
  await db.sequelize.close();
});

describe("Instance Endpoints", () => {
  test("POST /instance - create new instance", async () => {
    const res = await request(app)
      .post("/api/v1/instance")
      .set("Authorization", `Bearer ${professorToken}`)
      .send({ workflowId });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.instance).toHaveProperty("id");
    instanceId = res.body.data.instance.id;
  });

  test("GET /instance/mine - fetch user's instances", async () => {
    const res = await request(app)
      .get("/api/v1/instance/mine")
      .set("Authorization", `Bearer ${professorToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data.instances)).toBe(true);
  });

  test("GET /instance/:id - fetch instance by id", async () => {
    const res = await request(app)
      .get(`/api/v1/instance/${instanceId}`)
      .set("Authorization", `Bearer ${professorToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.instance.id).toBe(instanceId);
  });
});

