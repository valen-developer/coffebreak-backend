import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { PlaylistTematicCreator } from "../../../../../context/PodcastApp/Playlist/application/PlaylistTematicCreator";
import { FormDataParser } from "../../../../../context/PodcastApp/Shared/domain/interfaces/FormDataParser.interface";
import { Container } from "../../dependency-injection/Container";
import { PlaylistUseCases } from "../../dependency-injection/injectPlaylistDependencies";
import { UtilDependencies } from "../../dependency-injection/injectUtils";
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

      res.json({ fields });
      return;

      const tematicCreator = container.get<PlaylistTematicCreator>(
        PlaylistUseCases.PlaylistTematicCreator
      );

      await tematicCreator.create(tematic, name, description);

      res.status(201).send();
    } catch (error) {
      console.log(error);
      // TODO: error custom manager
      res.status(500).send(error);
    }
  }
}
