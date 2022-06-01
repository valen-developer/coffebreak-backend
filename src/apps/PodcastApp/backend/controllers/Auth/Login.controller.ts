import { Request, Response } from "express";
import { LoginUser } from "../../../../../context/PodcastApp/User/application/LoginUser";
import { Container } from "../../dependency-injection/Container";
import { UserDependencies } from "../../dependency-injection/injectUserDependencies";
import { HttpErrorManager } from "../../helpers/HttpErrorManager";
import { Controller } from "../Controller.interface";

export class LoginController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const body = req.body;
    const { email, password } = body;

    try {
      const container = Container.getInstance();
      const authLogger = container.get<LoginUser>(UserDependencies.LoginUser);

      const { user, token } = await authLogger.login(email, password);

      res.json({
        ok: true,
        user,
        token,
      });
    } catch (error) {
      const { status, message } = new HttpErrorManager().manage(error);

      res.status(status).json({
        ok: false,
        message,
      });
    }
  }
}
