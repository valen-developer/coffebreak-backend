import { Request, Response } from "express";
import { PlaylistDuplicator } from "../../../../../context/PodcastApp/Playlist/application/PlaylistDuplicator";
import { User } from "../../../../../context/PodcastApp/User/domain/User.mode";
import { Container } from "../../dependency-injection/Container";
import { PlaylistUseCases } from "../../dependency-injection/injectPlaylistDependencies";
import { HttpErrorManager } from "../../helpers/HttpErrorManager";
import { Controller } from "../Controller.interface";

export class DuplicatePlaylistController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const loggedUser: User = req.body.session.user;
    const { uuid } = req.params;

    try {
      const container = Container.getInstance();

      const playlistDuplicator = container.get<PlaylistDuplicator>(
        PlaylistUseCases.PlaylistDuplicator
      );

      const playlist = await playlistDuplicator.duplicate(
        uuid,
        loggedUser.uuid.value
      );

      res.status(200).json({
        ok: true,
        playlist: playlist.toDTO(),
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
