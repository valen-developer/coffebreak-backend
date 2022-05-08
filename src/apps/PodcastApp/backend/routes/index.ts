import { Router } from "express";
import { podcastEpisodeRouter } from "./podcastEpisode.routes";

export const router = Router();

router.use("/episode", podcastEpisodeRouter);
