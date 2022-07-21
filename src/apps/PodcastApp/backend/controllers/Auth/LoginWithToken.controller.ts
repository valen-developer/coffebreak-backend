import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { User } from "../../../../../context/PodcastApp/User/domain/User.mode";
import { HttpErrorManager } from "../../helpers/HttpErrorManager";
import { Controller } from "../Controller.interface";

export class LoginWithTokenController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const loggedUser = req.body.session.user as User;

    try {
      if (!loggedUser) {
        throw new Error("Not logged user");
      }

      res.status(200).json({
        ok: true,
        user: loggedUser.toDtoWidthoutPassword(),
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
