import { Request, Response } from "express";
import { SignupUser } from "../../../../../context/PodcastApp/User/application/SingupUser";
import { Container } from "../../dependency-injection/Container";
import { UserDependencies } from "../../dependency-injection/injectUserDependencies";
import { HttpErrorManager } from "../../helpers/HttpErrorManager";
import { Controller } from "../Controller.interface";

export class SignupController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const body = req.body;
    const { uuid, name, email, password, passwordConfirmation } = body;

    try {
      const container = Container.getInstance();

      const signuper = container.get<SignupUser>(UserDependencies.SignupUser);

      await signuper.signup({
        uuid,
        name,
        email,
        password,
        passwordConfirmation,
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
