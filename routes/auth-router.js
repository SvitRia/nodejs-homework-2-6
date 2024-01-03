import express from "express";
import userController from "../controler/auth-controller.js";
import { isEmptyBody, isValidId } from "../middlewares/index.js";
import { validateBody } from "../decorators/index.js";
import { userRegisterSchema, userSigninSchema } from "../models/Users.js";

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, validateBody(userRegisterSchema), userController.register
)

export default authRouter;