import express from "express";
import userController from "../../controller/auth-controller.js";
import { authenticate, isEmptyBody, upload} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { userRegisterSchema, userLoginSchema, userSubscriptionSchema, userEmailSchema} from "../../models/Users.js";

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, validateBody(userRegisterSchema), userController.register)

authRouter.get("/verify/:verificationToken", userController.verify)

authRouter.post("/verify", isEmptyBody, validateBody(userEmailSchema), userController.resendVerifyEmail)

authRouter.post("/login", isEmptyBody, validateBody(userLoginSchema), userController.login)

authRouter.get("/current", authenticate, userController.getCurrent)

authRouter.post("/logout", authenticate, userController.logout)

authRouter.patch("/", authenticate, isEmptyBody, validateBody(userSubscriptionSchema), userController.subscription)

authRouter.patch("/avatar", authenticate, upload.single("avatar"), userController.updateAvatar)

export default authRouter;