import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

const createAdminIfNotExists = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) return;

  const existingAdmin = await User.findOne({
    email: adminEmail,
    role: "admin"
  });

  if (existingAdmin) {
    console.log("Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD,
    10
  );

  await User.create({
    fullName: process.env.ADMIN_NAME || "Admin",
    email: adminEmail,
    password: hashedPassword,
    role: "admin",
    isActive: true
  });

  console.log("Admin user created from env");
};

export default createAdminIfNotExists;
