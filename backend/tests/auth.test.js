const request = require("supertest");
const app = require("../src/app");
const db = require("../src/models");
const dotenv = require("dotenv")

dotenv.config()

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
});

afterAll(async () => {
  await db.sequelize.close();
});

describe("Auth Endpoints", () => {
  test("POST /api/v1/auth/signup - should create a new user", async () => {
    const res = await request(app)
      .post("/api/v1/auth/signup")
      .send({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "password123",
        role: "professor"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe("success");
    expect(res.body.data.user).toHaveProperty("id");
    expect(res.body.data.user).not.toHaveProperty("password");
  });

  test("POST /api/v1/auth/signup - duplicate email should fail", async () => {
    const res = await request(app)
      .post("/api/v1/auth/signup")
      .send({
        firstName: "John",
        lastName: "Smith",
        email: "john@example.com", // same email
        password: "pass456",
        role: "professor"
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Email already exists");
  });

  test("POST /api/v1/auth/login - should return a JWT token", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "john@example.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    console.log(res.body)
    expect(res.body.data.token).toBeDefined();
  });

  test("POST /api/v1/auth/login - wrong password should fail", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "john@example.com",
        password: "wrongpass"
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Invalid email or password");
  });
});
