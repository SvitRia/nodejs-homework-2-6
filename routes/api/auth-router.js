import express from "express";
import userController from "../../controller/auth-controller.js";
import { authenticate, isEmptyBody} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { userRegisterSchema, userLoginSchema, userSubscriptionSchema} from "../../models/Users.js";

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, validateBody(userRegisterSchema), userController.register)

authRouter.post("/login", isEmptyBody, validateBody(userLoginSchema), userController.login)

authRouter.get("/current", authenticate, userController.getCurrent)

authRouter.post("/logout", authenticate, userController.logout)

authRouter.patch("/", authenticate, isEmptyBody, validateBody(userSubscriptionSchema), userController.subscription)

export default authRouter;