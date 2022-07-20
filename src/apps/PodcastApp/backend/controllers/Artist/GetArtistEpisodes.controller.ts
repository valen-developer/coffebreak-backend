import { Request, Response } from "express";
import { ArtistFinder } from "../../../../../context/PodcastApp/Artist/application/ArtistFinder";
import { Container } from "../../dependency-injection/Container";
import { ArtistDependencies } from "../../dependency-injection/injectArtistDependencies";
import { HttpErrorManager } from "../../helpers/HttpErrorManager";
import { Controller } from "../Controller.interface";

export class GetArtistEpisodesController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const uuid = req.params.uuid;

    try {
      const container = Container.getInstance();
      const artistFinder = container.get<ArtistFinder>(
        ArtistDependencies.ArtistFinder
      );

      const episodes = await artistFinder.findEpisodes(uuid);

      res.json({
        ok: true,
        episodes: episodes.map((e) => e.toDTO()),
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
