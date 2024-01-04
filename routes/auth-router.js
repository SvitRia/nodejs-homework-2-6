import express from "express";
import userController from "../controler/auth-controller.js";
import { authenticate, isEmptyBody} from "../middlewares/index.js";
import { validateBody } from "../decorators/index.js";
import { userRegisterSchema, userLoginSchema} from "../models/Users.js";

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, validateBody(userRegisterSchema), userController.register
)

authRouter.post("/login", isEmptyBody, validateBody(userLoginSchema), userController.login)

export default authRouter;