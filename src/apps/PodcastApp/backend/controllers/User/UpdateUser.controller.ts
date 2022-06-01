import { Request, Response } from "express";
import { FormDataParser } from "../../../../../context/PodcastApp/Shared/domain/interfaces/FormDataParser.interface";
import { UserUpdater } from "../../../../../context/PodcastApp/User/application/UserUpdater";
import { Container } from "../../dependency-injection/Container";
import { UserDependencies } from "../../dependency-injection/injectUserDependencies";
import { UtilDependencies } from "../../dependency-injection/injectUtils";
import { HttpErrorManager } from "../../helpers/HttpErrorManager";
import { Controller } from "../Controller.interface";

export class UpdateUserController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid: userUuid } = req.params;

    try {
      const container = Container.getInstance();
      const formDataParser = container.get<FormDataParser>(
        UtilDependencies.FormDataParser
      );

      const { fields, files } = await formDataParser.parse<UpdateUserBody>(req);

      const userUpdater = container.get<UserUpdater>(
        UserDependencies.UserUpdater
      );

      await userUpdater.update({
        uuid: userUuid,
        name: fields.name,
        email: fields.email,
        fileData: files[0],
      });

      res.status(201).json({
        ok: true,
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

interface UpdateUserBody {
  name: string;
  email: string;
}
