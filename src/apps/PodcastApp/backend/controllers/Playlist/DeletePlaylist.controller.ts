import { Request, Response } from "express";
import { PlaylistDeleter } from "../../../../../context/PodcastApp/Playlist/application/PlaylistDeleter";
import { Container } from "../../dependency-injection/Container";
import { PlaylistUseCases } from "../../dependency-injection/injectPlaylistDependencies";
import { HttpErrorManager } from "../../helpers/HttpErrorManager";
import { Controller } from "../Controller.interface";

export class DeletePlaylistController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;

    try {
      const container = Container.getInstance();

      const playlistDeleter = container.get<PlaylistDeleter>(
        PlaylistUseCases.PlaylistDeleter
      );
      await playlistDeleter.delete(uuid);

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
