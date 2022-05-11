import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { PlaylistTematicCreator } from "../../../../../context/PodcastApp/Playlist/application/PlaylistTematicCreator";
import { Container } from "../../dependency-injection/Container";
import { PlaylistUseCases } from "../../dependency-injection/injectPlaylistDependencies";
import { Controller } from "../Controller.interface";

export class CreateTematicPlaylistController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { tematic, name, description } = req.body;

    try {
      const container = Container.getInstance();

      const tematicCreator = container.get<PlaylistTematicCreator>(
        PlaylistUseCases.PlaylistTematicCreator
      );

      await tematicCreator.create(tematic, name, description);

      res.status(201).send();
    } catch (error) {
      console.log(error);
      // TODO: error custom manager
      res.status(500).send(error);
    }
  }
}
