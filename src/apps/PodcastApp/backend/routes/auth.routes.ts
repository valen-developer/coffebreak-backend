import { Router } from "express";
import passport from "passport";
import { ChangePasswordController } from "../controllers/Auth/ChangePassword.controller";
import { GoogleSignupController } from "../controllers/Auth/GoogleSignup.controller";
import { LoginController } from "../controllers/Auth/Login.controller";
import { LoginWithTokenController } from "../controllers/Auth/LoginWithToken.controller";
import { RecoverPassowordController } from "../controllers/Auth/RecoverPassword.controller";
import { SignupController } from "../controllers/Auth/Signup.controller";
import { PassportGoogleCallbackMiddleware } from "../middlewares/PassportGoogleCallback.middleware";
import { ValidateJWTMiddlware } from "../middlewares/ValidateJWT.middleware";

export const authRouter = Router();

authRouter.post("/signup", new SignupController().run);
authRouter.post("/login", new LoginController().run);
authRouter.post(
  "/login/token",
  [new ValidateJWTMiddlware().handle],
  new LoginWithTokenController().run
);
authRouter.put(
  "/password",
  [new ValidateJWTMiddlware().handle],
  new ChangePasswordController().run
);
authRouter.put("/password/recovery", new RecoverPassowordController().run);

// Passport
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  [PassportGoogleCallbackMiddleware()],
  new GoogleSignupController().run
);
