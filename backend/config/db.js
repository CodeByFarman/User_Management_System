import mongoose from "mongoose";
import createAdminIfNotExists from "./createAdmin.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // create admin after DB connects only if not in test env
     if (process.env.NODE_ENV !== "test") {
      await createAdminIfNotExists();
    }
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
