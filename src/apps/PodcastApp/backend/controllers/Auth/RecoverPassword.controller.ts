import { Request, Response } from "express";
import {
  PasswordRecover,
  PasswordRecoverParams,
} from "../../../../../context/PodcastApp/User/application/PasswordRecover";
import { Container } from "../../dependency-injection/Container";
import { UserDependencies } from "../../dependency-injection/injectUserDependencies";
import { HttpErrorManager } from "../../helpers/HttpErrorManager";
import { Controller } from "../Controller.interface";

export class RecoverPassowordController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const params = req.body as PasswordRecoverParams;

    try {
      const container = Container.getInstance();

      const passwordRecover = container.get<PasswordRecover>(
        UserDependencies.PasswordRecover
      );

      await passwordRecover.recovery(params);

      res.status(201).json({ ok: true });
    } catch (error) {
      const { status, message } = new HttpErrorManager().manage(error);
      res.status(status).json({ ok: false, message });
    }
  }
}
