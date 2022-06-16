import { Router } from "express";
import { LoginController } from "../controllers/Auth/Login.controller";
import { LoginWithTokenController } from "../controllers/Auth/LoginWithToken.controller";
import { SignupController } from "../controllers/Auth/Signup.controller";
import { ValidateJWTMiddlware } from "../middlewares/ValidateJWT.middleware";

export const authRouter = Router();

authRouter.post("/signup", new SignupController().run);
authRouter.post("/login", new LoginController().run);
authRouter.post(
  "/login/token",
  [new ValidateJWTMiddlware().handle],
  new LoginWithTokenController().run
);
