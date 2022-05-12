import { Request, Response } from "express";
import { PlaylistFinder } from "../../../../../context/PodcastApp/Playlist/application/PlaylistFinder";
import { Container } from "../../dependency-injection/Container";
import { PlaylistUseCases } from "../../dependency-injection/injectPlaylistDependencies";
import { Controller } from "../Controller.interface";

export class GetAllChannelsController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    try {
      const container = Container.getInstance();

      const playlistFinder = container.get<PlaylistFinder>(
        PlaylistUseCases.PlaylistFinder
      );

      const channels = await playlistFinder.getChannels();

      res.json({
        ok: true,
        channels: channels.map((c) => c.toDTO()),
      });
    } catch (error) {
      console.log(error);
      // TODO: custom error manager
      res.status(500).send(error);
    }
  }
}
