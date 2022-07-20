import { Router } from "express";
import { GetAllArtistsController } from "../controllers/Artist/GetAllArtist.controller";
import { GetArtistEpisodesController } from "../controllers/Artist/GetArtistEpisodes.controller";

export const artistRouter = Router();

artistRouter.get("/all", new GetAllArtistsController().run);
artistRouter.get("/:uuid/episodes", new GetArtistEpisodesController().run);
