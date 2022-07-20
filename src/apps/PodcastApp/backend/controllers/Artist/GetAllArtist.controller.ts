import { Request, Response } from "express";
import { ArtistFinder } from "../../../../../context/PodcastApp/Artist/application/ArtistFinder";
import { Container } from "../../dependency-injection/Container";
import { ArtistDependencies } from "../../dependency-injection/injectArtistDependencies";
import { HttpErrorManager } from "../../helpers/HttpErrorManager";
import { Controller } from "../Controller.interface";

export class GetAllArtistsController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    try {
      const container = Container.getInstance();

      const artistFinder = container.get<ArtistFinder>(
        ArtistDependencies.ArtistFinder
      );

      const artists = await artistFinder.findAll();

      res.json({
        ok: true,
        artists: artists.map((a) => a.toDto()),
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
