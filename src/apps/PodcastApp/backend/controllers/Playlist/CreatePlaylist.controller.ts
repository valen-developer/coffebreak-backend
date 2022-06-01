import { Request, Response } from "express";
import { PlaylistCreator } from "../../../../../context/PodcastApp/Playlist/application/PlaylistCreator";
import { FormDataParser } from "../../../../../context/PodcastApp/Shared/domain/interfaces/FormDataParser.interface";
import { Container } from "../../dependency-injection/Container";
import { PlaylistUseCases } from "../../dependency-injection/injectPlaylistDependencies";
import { UtilDependencies } from "../../dependency-injection/injectUtils";
import { HttpErrorManager } from "../../helpers/HttpErrorManager";
import { Controller } from "../Controller.interface";

export class CreatePlaylistController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { userTokenUuid } = req.body;

    try {
      const container = Container.getInstance();

      const formDataParser = container.get<FormDataParser>(
        UtilDependencies.FormDataParser
      );

      const { fields, files } = await formDataParser.parse<CreatePlaylistBody>(
        req
      );

      const { uuid, name, description } = fields;

      const playlistCreator = container.get<PlaylistCreator>(
        PlaylistUseCases.PlaylistCreator
      );

      await playlistCreator.create({
        uuid,
        name,
        description,
        own: userTokenUuid,
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

interface CreatePlaylistBody {
  uuid: string;
  name: string;
  description: string;
}
