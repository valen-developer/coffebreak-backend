import { Request, Response } from "express";
import { PodcastEpisodeFinder } from "../../../../../context/PodcastApp/Podcast/application/PodcastEpisodeFinder";
import { Container } from "../../dependency-injection/Container";
import { PodcastEpisodeDependencies } from "../../dependency-injection/injectPodcastEpisodiesDependencies";
import { Controller } from "../Controller.interface";

export class GetEpisodesController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const body = req.body;
    const query = { ...body };
    const paginator = { ...body };

    try {
      const container = Container.getInstance();

      const podcastEpisodeFinder = container.get<PodcastEpisodeFinder>(
        PodcastEpisodeDependencies.PodcastEpisodeFinder
      );

      const episodes = await podcastEpisodeFinder.filter(query, paginator);

      res.status(200).json({
        ok: true,
        episodes: episodes.map((e) => e.toDTO()),
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
