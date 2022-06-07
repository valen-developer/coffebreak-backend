import { Request, Response } from "express";
import { PlaylistEpisodeUpdater } from "../../../../../context/PodcastApp/Playlist/application/PlaylistEpisodeUpdater";
import { Container } from "../../dependency-injection/Container";
import { PlaylistUseCases } from "../../dependency-injection/injectPlaylistDependencies";
import { HttpErrorManager } from "../../helpers/HttpErrorManager";
import { Controller } from "../Controller.interface";

export class AddEpisodeToPlaylistController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid: playlistUuid } = req.params;
    const { episodeUuid } = req.body;

    try {
      const container = Container.getInstance();

      const playlistEpisodeUpdater = container.get<PlaylistEpisodeUpdater>(
        PlaylistUseCases.PlaylistEpisodesUpdater
      );

      await playlistEpisodeUpdater.addEpisode(playlistUuid, episodeUuid);

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
