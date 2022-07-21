import { Request, Response } from "express";
import { PasswordChanger } from "../../../../../context/PodcastApp/User/application/PasswordChanger";
import { User } from "../../../../../context/PodcastApp/User/domain/User.mode";
import { Container } from "../../dependency-injection/Container";
import { UserDependencies } from "../../dependency-injection/injectUserDependencies";
import { HttpErrorManager } from "../../helpers/HttpErrorManager";
import { Controller } from "../Controller.interface";

export class ChangePasswordController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { password, passwordConfirmation } = req.body;
    const user: User = req.body.session.user;

    try {
      const passwordChanger = Container.getInstance().get<PasswordChanger>(
        UserDependencies.PasswordChanger
      );

      await passwordChanger.changePassword({
        password,
        passwordConfirmation,
        userUuid: user.uuid.value,
      });

      res.status(201).json({ ok: true });
    } catch (error) {
      const { status, message } = new HttpErrorManager().manage(error);

      res.status(status).json({
        ok: false,
        message,
      });
    }
  }
}
