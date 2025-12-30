import express from "express";
import {
  signup,
  login,
  currentUser,
  logout
} from "../controllers/auth.controller.js";
import auth from "../middlewares/auth.middleware.js";
import {
  signupValidator,
  loginValidator
} from "../validators/auth.validator.js";

const router = express.Router();

router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);
router.get("/me", auth, currentUser);
router.post("/logout", auth, logout);

export default router;
