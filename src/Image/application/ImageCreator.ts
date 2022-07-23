import { Image, ImageDTO } from "../domain/Image.model";
import { ImageRepository } from "../domain/interfaces/ImageRepository.interface";

export class ImageCreator {
  constructor(private imageRepository: ImageRepository) {}

  public async create(imageDTO: ImageDTO): Promise<Image> {
    const image = new Image(imageDTO);
    await this.imageRepository.save(image);

    return image;
  }
}
