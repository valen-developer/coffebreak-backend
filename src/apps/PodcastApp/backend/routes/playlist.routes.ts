import { Router } from "express";
import { AddEpisodeToPlaylistController } from "../controllers/Playlist/AddEpisode.controller";
import { CreatePlaylistController } from "../controllers/Playlist/CreatePlaylist.controller";
import { CreateTematicPlaylistController } from "../controllers/Playlist/CreateTematicPlaylist.controller";
import { GetAllChannelsController } from "../controllers/Playlist/GetAllChannels.controller";
import { GetPlaylistEpisodesController } from "../controllers/Playlist/GetEpisodes.controller";
import { GetPlaylistController } from "../controllers/Playlist/GetPlaylist.controller";
import { GetPlaylistByOwnController } from "../controllers/Playlist/GetPlaylistByOwn.controller";
import { RemoveEpisodeFromPlaylistController } from "../controllers/Playlist/RemoveEpisode.controller";
import { ValidateJWTMiddlware } from "../middlewares/ValidateJWT.middleware";

export const playlistRouter = Router();

// Get
playlistRouter.get(
  "/own",
  [new ValidateJWTMiddlware().handle],
  new GetPlaylistByOwnController().run
);
playlistRouter.get("/channels", new GetAllChannelsController().run);
playlistRouter.get("/:uuid/episodes", new GetPlaylistEpisodesController().run);
playlistRouter.get("/:uuid", new GetPlaylistController().run);

// Post
playlistRouter.post(
  "/",
  [new ValidateJWTMiddlware().handle],
  new CreatePlaylistController().run
);
playlistRouter.post(
  "/tematic",
  [new ValidateJWTMiddlware().handle],
  new CreateTematicPlaylistController().run
);

// Put
playlistRouter.post(
  "/:uuid/episode/add",
  [new ValidateJWTMiddlware().handle],
  new AddEpisodeToPlaylistController().run
);
playlistRouter.post(
  "/:uuid/episode/remove",
  [new ValidateJWTMiddlware().handle],
  new RemoveEpisodeFromPlaylistController().run
);

// Delete
