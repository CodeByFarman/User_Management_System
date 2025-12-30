import { body } from "express-validator";

export const signupValidator = [
  body("fullName").notEmpty(),
  body("email").isEmail(),
  body("password")
    .isLength({ min: 8 })
    .matches(/[A-Z]/)
    .matches(/[0-9]/)
];

export const loginValidator = [
  body("email").isEmail(),
  body("password").notEmpty()
];
