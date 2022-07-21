import { Request, Response } from "express";
import { UserValidator } from "../../../../../context/PodcastApp/User/application/UserValidator";
import { User } from "../../../../../context/PodcastApp/User/domain/User.mode";
import { Container } from "../../dependency-injection/Container";
import { UserDependencies } from "../../dependency-injection/injectUserDependencies";
import { HttpErrorManager } from "../../helpers/HttpErrorManager";
import { Controller } from "../Controller.interface";

export class ValidateUserController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const user = req.body.session.user as User;

    try {
      const container = Container.getInstance();

      await container
        .get<UserValidator>(UserDependencies.UserValidator)
        .validateUser(user);

      res.status(201).json({
        ok: true,
      });
    } catch (error) {
      const { status, message } = new HttpErrorManager().manage(error);
      res.status(status).json({ ok: false, message });
    }
  }
}
