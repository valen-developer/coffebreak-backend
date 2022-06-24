import { Request, Response } from "express";
import { PlaylistFinder } from "../../../../../context/PodcastApp/Playlist/application/PlaylistFinder";
import { PlaylistUpdater } from "../../../../../context/PodcastApp/Playlist/application/PlaylistUpdater";
import { Playlist } from "../../../../../context/PodcastApp/Playlist/domain/Playlist.model";
import { FormDataParser } from "../../../../../context/PodcastApp/Shared/domain/interfaces/FormDataParser.interface";
import { Container } from "../../dependency-injection/Container";
import { PlaylistUseCases } from "../../dependency-injection/injectPlaylistDependencies";
import { UtilDependencies } from "../../dependency-injection/injectUtils";
import { HttpErrorManager } from "../../helpers/HttpErrorManager";
import { Controller } from "../Controller.interface";

export class UpdatePlaylistController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;

    try {
      const container = Container.getInstance();

      const formParses = container.get<FormDataParser>(
        UtilDependencies.FormDataParser
      );

      const { files, fields } = await formParses.parse<{
        name: string;
        description: string;
      }>(req);

      const { name, description } = fields;

      const playlistFinder = container.get<PlaylistFinder>(
        PlaylistUseCases.PlaylistFinder
      );

      const playlistUpdater = container.get<PlaylistUpdater>(
        PlaylistUseCases.PlaylistUpdater
      );

      const playlist = await playlistFinder.getPlaylist(uuid);
      const updatedPlaylist = new Playlist({
        ...playlist.toDTO(),
        name,
        description,
      });

      const fileData = files[0];

      await playlistUpdater.update(updatedPlaylist, fileData);

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
