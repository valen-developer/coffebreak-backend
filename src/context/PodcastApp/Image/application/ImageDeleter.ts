import { Image } from "../domain/Image.model";

import { ImageRepository } from "../domain/interfaces/ImageRepository.interface";

export class ImageDeleter {
  constructor(private imageRepository: ImageRepository) {}

  public async deleteByUuid(uuid: string): Promise<void> {
    await this.imageRepository.deleteByUuid(uuid);
  }

  public async deleteByEntityUuid(entityUuid: string): Promise<void> {
    await this.imageRepository.deleteByEntityUuid(entityUuid);
  }
}
