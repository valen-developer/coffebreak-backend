import { Injectable } from '@nestjs/common';
import { asyncForeach } from 'src/helpers/functions/asyncForeach.function';
import { FileUploader } from '../../Shared/domain/interfaces/FileUploader';
import { Image } from '../domain/Image.model';

import { ImageRepository } from '../domain/interfaces/ImageRepository.interface';

@Injectable()
export class ImageDeleter {
  constructor(
    private imageRepository: ImageRepository,
    private fileUploader: FileUploader,
  ) {}

  public async deleteByUuid(uuid: string): Promise<void> {
    const image = await this.imageRepository.findByUuid(uuid);
    await this.deleteImage(image);
  }

  public async deleteByEntityUuid(entityUuid: string): Promise<void> {
    const images = await this.imageRepository.findByEntityUuid(entityUuid);
    await asyncForeach(images, async (i) => {
      await this.deleteImage(i);
    });
  }

  private async deleteImage(image: Image): Promise<void> {
    await this.fileUploader.deleteImage(image.path.value);
    await this.imageRepository.deleteByUuid(image.uuid.value);
  }
}
