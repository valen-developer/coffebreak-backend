import { Request, Response } from "express";
import { UserStatusUpdater } from "../../../../../context/PodcastApp/User/application/UserStatusUpdater";
import { Container } from "../../dependency-injection/Container";
import { UserDependencies } from "../../dependency-injection/injectUserDependencies";
import { HttpErrorManager } from "../../helpers/HttpErrorManager";
import { Controller } from "../Controller.interface";

export class ValidateUserController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { userTokenUuid } = req.body;

    try {
      const container = Container.getInstance();
      const userStatusUpdater = container.get<UserStatusUpdater>(
        UserDependencies.UserStatusUpdater
      );

      await userStatusUpdater.activateUser(userTokenUuid);

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
