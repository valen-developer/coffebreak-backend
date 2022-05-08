import { Router } from "express";
import { GetEpisodesController } from "../controllers/PodcastEpisode/GetEpisodes.controller";

export const podcastEpisodeRouter = Router();

podcastEpisodeRouter.post("/filter", new GetEpisodesController().run);
