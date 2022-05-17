import { Request, Response } from "express";
import { existsSync } from "fs";
import { ImageFinder } from "../../../../../context/PodcastApp/Image/application/ImageFinder";
import { Container } from "../../dependency-injection/Container";
import { ImageDependencies } from "../../dependency-injection/injectImageDependencies";
import { HttpErrorManager } from "../../helpers/HttpErrorManager";
import { Controller } from "../Controller.interface";

export class GetImageByEntity implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;

    try {
      const container = Container.getInstance();

      const imageFinder = container.get<ImageFinder>(
        ImageDependencies.ImageFinder
      );

      const images = await imageFinder.findByEntityUuid(uuid);
      const featuredImagePath = images[0].path.value;
      const exitImage = existsSync(featuredImagePath);

      if (!exitImage) throw new Error("Image not found");

      res.sendFile(featuredImagePath);
    } catch (error) {
      const { status, message } = new HttpErrorManager().manage(error);

      res.status(status).json({
        ok: false,
        message,
      });
    }
  }
}
