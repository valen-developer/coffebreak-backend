import { Router } from "express";
import { UpdateUserController } from "../controllers/User/UpdateUser.controller";
import { ValidateUserController } from "../controllers/User/ValidateUser.controller";

export const userRouter = Router();

userRouter.put("/:uuid", new UpdateUserController().run);
userRouter.put("/validate/:uuid", new ValidateUserController().run);
