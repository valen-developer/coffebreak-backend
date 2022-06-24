import { UUIDGenerator } from "../../Shared/domain/interfaces/UuidGenerator";
import { Image } from "../domain/Image.model";
import { ImageRepository } from "../domain/interfaces/ImageRepository.interface";

export class ImageUpdater {
  constructor(private imageRepository: ImageRepository) {}

  public async update(image: Image): Promise<Image> {
    return this.imageRepository.update(image);
  }

  public async replaceForEntity(
    entityUuid: string,
    imagePath: string,
    imageUuid: string
  ): Promise<Image> {
    await this.imageRepository.deleteByEntityUuid(entityUuid);

    const image = new Image({
      entityUuid,
      path: imagePath,
      uuid: imageUuid,
    });

    return this.imageRepository.save(image);
  }
}
