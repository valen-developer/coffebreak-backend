import { NextFunction, Request, Response } from "express";
import {
  JWT,
  JWT_CONFIG,
} from "../../../../context/PodcastApp/Shared/domain/interfaces/JWT.interface";
import { UserFinder } from "../../../../context/PodcastApp/User/application/UserFinder";
import { Container } from "../dependency-injection/Container";
import { UserDependencies } from "../dependency-injection/injectUserDependencies";
import { UtilDependencies } from "../dependency-injection/injectUtils";
import { Middleware } from "./Middleware.interface";

export class ValidateJWTMiddlware implements Middleware {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // extract Bearer token from Authorization header (format Bearer <token>)
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) throw new Error("Token not found");

      const container = Container.getInstance();
      const jwt = container.get<JWT>(UtilDependencies.JWT);

      // validate token
      const isValid = await jwt.verify(token, JWT_CONFIG.secret);
      if (!isValid) throw new Error("Invalid token");

      const decoded = jwt.decode(token);
      const { uuid } = decoded;
      req.body.userTokenUuid = uuid;

      // get user from token
      const userFinder = container.get<UserFinder>(UserDependencies.UserFinder);
      const user = await userFinder.findByUuid(uuid);

      if (!user) throw new Error("User not found");
      req.body = {
        ...req.body,
        session: { user },
      };

      next();
    } catch (error) {
      res.status(401).json({
        ok: false,
        message: "Unauthorized",
      });
    }
  }
}
