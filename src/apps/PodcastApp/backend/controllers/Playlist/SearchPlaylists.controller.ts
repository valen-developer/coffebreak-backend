import { Request, Response } from "express";
import { PlaylistFinder } from "../../../../../context/PodcastApp/Playlist/application/PlaylistFinder";
import { PlaylistQuery } from "../../../../../context/PodcastApp/Playlist/domain/PlaylistQuery";
import { Container } from "../../dependency-injection/Container";
import { PlaylistUseCases } from "../../dependency-injection/injectPlaylistDependencies";
import { HttpErrorManager } from "../../helpers/HttpErrorManager";
import { Controller } from "../Controller.interface";

export class SearchPlaylistsController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const body = req.body;
    const query: PlaylistQuery = {
      ...body,
      own_equal: body.userTokenUuid,
    };

    try {
      const playlistFinder = Container.getInstance().get<PlaylistFinder>(
        PlaylistUseCases.PlaylistFinder
      );

      const playlists = await playlistFinder.filter(query);

      res.json({
        ok: true,
        playlists: playlists.map((p) => p.toDTO()),
      });
    } catch (error) {
      const { message, status } = new HttpErrorManager().manage(error);

      res.status(status).json({
        ok: false,
        message,
      });
    }
  }
}
