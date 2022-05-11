import { Router } from "express";
import { CreatePlaylistController } from "../controllers/Playlist/CreatePlaylist.controller";
import { CreateTematicPlaylistController } from "../controllers/Playlist/CreateTematicPlaylist.controller";
import { GetAllChannelsController } from "../controllers/Playlist/GetAllChannels.controller";
import { GetPlaylistEpisodesController } from "../controllers/Playlist/GetEpisodes.controller";
import { GetPlaylistController } from "../controllers/Playlist/GetPlaylist.controller";
import { GetPlaylistByOwnController } from "../controllers/Playlist/GetPlaylistByOwn.controller";

export const playlistRouter = Router();

// Get
playlistRouter.get("/channels", new GetAllChannelsController().run);
playlistRouter.get("/own", new GetPlaylistByOwnController().run);
playlistRouter.get("/:uuid/episodes", new GetPlaylistEpisodesController().run);
playlistRouter.get("/:uuid", new GetPlaylistController().run);

// Post
playlistRouter.post("/", new CreatePlaylistController().run);
playlistRouter.post("/tematic", new CreateTematicPlaylistController().run);

// Put

// Delete
