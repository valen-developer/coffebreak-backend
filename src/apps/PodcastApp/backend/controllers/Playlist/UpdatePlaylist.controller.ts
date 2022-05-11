import { Request, Response } from "express";
import { PlaylistFinder } from "../../../../../context/PodcastApp/Playlist/application/PlaylistFinder";
import { PlaylistUpdater } from "../../../../../context/PodcastApp/Playlist/application/PlaylistUpdater";
import { Playlist } from "../../../../../context/PodcastApp/Playlist/domain/Playlist.model";
import { Container } from "../../dependency-injection/Container";
import { PlaylistUseCases } from "../../dependency-injection/injectPlaylistDependencies";
import { Controller } from "../Controller.interface";

export class UpdatePlaylistController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid, name, description } = req.body;

    try {
      const container = Container.getInstance();

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

      await playlistUpdater.update(updatedPlaylist);

      res.status(201).json({
        ok: true,
      });
    } catch (error) {
      // TODO: custom error manager
      res.status(500).send(error);
    }
  }
}
