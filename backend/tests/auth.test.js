import request from "supertest";
import app from "../server.js";
import mongoose from "mongoose";

let adminToken;

describe("Auth Tests", () => {
  it("should login seeded admin", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");

    adminToken = res.body.token;
  });

  it("should reject invalid login", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "wrong@test.com",
        password: "wrong"
      });

    expect(res.statusCode).toBe(401);
  });

  it("should get current admin user", async () => {
    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.role).toBe("admin");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});