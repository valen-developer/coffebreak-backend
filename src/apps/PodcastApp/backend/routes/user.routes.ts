import { Router } from "express";
import { UpdateUserController } from "../controllers/User/UpdateUser.controller";
import { ValidateJWTMiddlware } from "../middlewares/ValidateJWT.middleware";

export const userRouter = Router();

userRouter.put("/:uuid", new UpdateUserController().run);
