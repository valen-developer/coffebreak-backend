import { Router } from "express";
import { LoginController } from "../controllers/Auth/Login.controller";
import { SignupController } from "../controllers/Auth/Signup.controller";

export const authRouter = Router();

authRouter.post("/signup", new SignupController().run);
authRouter.post("/login", new LoginController().run);
