import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const users = await User.find()
    .skip(skip)
    .limit(limit)
    .select("-password");

  res.json(users);
};

export const activateUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { isActive: true });
  res.json({ message: "User activated" });
};

export const deactivateUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { isActive: false });
  res.json({ message: "User deactivated" });
};

export const updateProfile = async (req, res) => {
  const { fullName, email } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { fullName, email },
    { new: true }
  );
  res.json(user);
};

export const changePassword = async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  await User.findByIdAndUpdate(req.user._id, { password: hashed });
  res.json({ message: "Password updated" });
};

// export const adminUpdateUser = async (req, res) => {
//   const { fullName, email } = req.body;

//   const user = await User.findByIdAndUpdate(
//     req.params.id,
//     { fullName, email },
//     { new: true }
//   ).select("-password");

//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   res.status(200).json(user);
// };
