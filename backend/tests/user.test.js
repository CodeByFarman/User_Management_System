import request from "supertest";
import app from "../server.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

let userToken;

beforeAll(async () => {
  const hashedPassword = await bcrypt.hash("User@1234", 10);

  const uniqueEmail = `normal_${Date.now()}@test.com`;

  await User.create({
    fullName: "Normal User",
    email: uniqueEmail,
    password: hashedPassword,
    role: "user",
    isActive: true
  });

  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: uniqueEmail,
      password: "User@1234"
    });

  userToken = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("User Profile Update Tests", () => {
  it("should allow user to update own profile", async () => {
    const res = await request(app)
      .put("/api/users/profile")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        fullName: "Updated User"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.fullName).toBe("Updated User");
  });
});
