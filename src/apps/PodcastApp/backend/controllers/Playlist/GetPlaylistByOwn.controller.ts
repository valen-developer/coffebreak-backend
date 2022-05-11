import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { PlaylistFinder } from "../../../../../context/PodcastApp/Playlist/application/PlaylistFinder";
import { Container } from "../../dependency-injection/Container";
import { PlaylistUseCases } from "../../dependency-injection/injectPlaylistDependencies";
import { Controller } from "../Controller.interface";

export class GetPlaylistByOwnController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.body;

    try {
      const container = Container.getInstance();

      const playlistFinder = container.get<PlaylistFinder>(
        PlaylistUseCases.PlaylistFinder
      );

      const playlist = await playlistFinder.getyByOwn(uuid);

      res.json({
        ok: true,
        playlist: playlist.map((p) => p.toDTO()),
      });
    } catch (error) {
      console.log(error);
      // TODO: custom error manager
      res.status(500).send(error);
    }
  }
}
