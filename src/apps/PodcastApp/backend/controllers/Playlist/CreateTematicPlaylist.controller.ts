import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { PlaylistTematicCreator } from "../../../../../context/PodcastApp/Playlist/application/PlaylistTematicCreator";
import { FormDataParser } from "../../../../../context/PodcastApp/Shared/domain/interfaces/FormDataParser.interface";
import { Container } from "../../dependency-injection/Container";
import { PlaylistUseCases } from "../../dependency-injection/injectPlaylistDependencies";
import { UtilDependencies } from "../../dependency-injection/injectUtils";
import { HttpErrorManager } from "../../helpers/HttpErrorManager";
import { Controller } from "../Controller.interface";

export class CreateTematicPlaylistController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    console.log("Entra");

    try {
      const container = Container.getInstance();

      const formDataParser = container.get<FormDataParser>(
        UtilDependencies.FormDataParser
      );

      const { fields, files } = await formDataParser.parse<{
        tematic: string;
        name: string;
        description: string;
      }>(req);

      const { tematic, name, description } = fields;
      const tematicCreator = container.get<PlaylistTematicCreator>(
        PlaylistUseCases.PlaylistTematicCreator
      );

      await tematicCreator.create(tematic, name, description, files[0]);

      res.status(201).send();
    } catch (error) {
      const { status, message } = new HttpErrorManager().manage(error);

      res.status(status).json({
        ok: false,
        message,
      });
    }
  }
}
