import { Router } from "express";
import { UpdateUserController } from "../controllers/User/UpdateUser.controller";

export const userRouter = Router();

userRouter.put("/:uuid", new UpdateUserController().run);
