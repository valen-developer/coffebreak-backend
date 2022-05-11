import { Router } from "express";
import { playlistRouter } from "./playlist.routes";
import { podcastEpisodeRouter } from "./podcastEpisode.routes";

export const router = Router();

router.use("/episode", podcastEpisodeRouter);

router.use("/playlist", playlistRouter);
