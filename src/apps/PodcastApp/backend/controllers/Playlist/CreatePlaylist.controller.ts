import { Request, Response } from "express";
import { PlaylistCreator } from "../../../../../context/PodcastApp/Playlist/application/PlaylistCreator";
import { Container } from "../../dependency-injection/Container";
import { PlaylistUseCases } from "../../dependency-injection/injectPlaylistDependencies";
import { Controller } from "../Controller.interface";

export class CreatePlaylistController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid, name, description, own } = req.body;

    try {
      const container = Container.getInstance();

      const playlistCreator = container.get<PlaylistCreator>(
        PlaylistUseCases.PlaylistCreator
      );

      res.status(201).json({
        ok: true,
      });
    } catch (error) {
      // TODO: custom error manager
      res.status(500).send(error);
    }
  }
}
