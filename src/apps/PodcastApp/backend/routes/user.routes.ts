import { Router } from "express";
import { UpdateUserController } from "../controllers/User/UpdateUser.controller";
import { ValidateUserController } from "../controllers/User/ValidateUser.controller";
import { ValidateJWTMiddlware } from "../middlewares/ValidateJWT.middleware";

export const userRouter = Router();

userRouter.put("/:uuid", new UpdateUserController().run);
userRouter.put(
  "/validate/:uuid",
  [new ValidateJWTMiddlware().handle],
  new ValidateUserController().run
);
