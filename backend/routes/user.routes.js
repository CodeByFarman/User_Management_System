import express from "express";
import auth from "../middlewares/auth.middleware.js";
import role from "../middlewares/role.middleware.js";
import {
  getAllUsers,
  activateUser,
  deactivateUser,
  updateProfile,
  changePassword
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", auth, role("admin"), getAllUsers);
router.patch("/activate/:id", auth, role("admin"), activateUser);
router.patch("/deactivate/:id", auth, role("admin"), deactivateUser);

router.put("/profile", auth, updateProfile);
// router.put("/:id", auth, role("admin"), adminUpdateUser);
router.put("/password", auth, changePassword);

export default router;
