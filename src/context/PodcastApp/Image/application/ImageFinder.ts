import { Image } from "../domain/Image.model";
import { ImageRepository } from "../domain/interfaces/ImageRepository.interface";

export class ImageFinder {
  constructor(private imageRepository: ImageRepository) {}

  public async findByUuid(uuid: string): Promise<Image> {
    const image = await this.imageRepository.findByUuid(uuid);

    // TODO: Custom error
    if (!image) throw new Error("Image not found");

    return image;
  }

  public async findByEntityUuid(entityUuid: string): Promise<Image[]> {
    const images = await this.imageRepository.findByEntityUuid(entityUuid);

    return images;
  }
}
