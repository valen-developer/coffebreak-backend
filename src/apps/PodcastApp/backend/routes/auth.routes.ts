import passport from "passport";
import { Router } from "express";
import { ChangePasswordController } from "../controllers/Auth/ChangePassword.controller";
import { LoginController } from "../controllers/Auth/Login.controller";
import { LoginWithTokenController } from "../controllers/Auth/LoginWithToken.controller";
import { SignupController } from "../controllers/Auth/Signup.controller";
import { ValidateJWTMiddlware } from "../middlewares/ValidateJWT.middleware";
import { UserDependencies } from "../dependency-injection/injectUserDependencies";
import { UserFinder } from "../../../../context/PodcastApp/User/application/UserFinder";
import { Container } from "../dependency-injection/Container";
import { GoogleLogin } from "../../../../context/PodcastApp/User/application/GoogleLogin";
import { GoogleSignupController } from "../controllers/Auth/GoogleSignup.controller";
import { PassportGoogleCallbackMiddleware } from "../middlewares/PassportGoogleCallback.middleware";

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
