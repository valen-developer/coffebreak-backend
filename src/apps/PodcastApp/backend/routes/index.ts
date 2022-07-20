import { Router } from "express";
import { artistRouter } from "./artist.routes";
import { authRouter } from "./auth.routes";
import { imageRouter } from "./image.routes";
import { playlistRouter } from "./playlist.routes";
import { podcastEpisodeRouter } from "./podcastEpisode.routes";
import { userRouter } from "./user.routes";

export const router = Router();

router.use("/episode", podcastEpisodeRouter);

router.use("/playlist", playlistRouter);

router.use("/image", imageRouter);

router.use("/auth", authRouter);

router.use("/user", userRouter);

router.use("/artist", artistRouter);
