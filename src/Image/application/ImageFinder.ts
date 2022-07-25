import { Injectable } from '@nestjs/common';
import { NotFoundImageException } from '../domain/exceptions/NotFoundImage.exception';
import { Image } from '../domain/Image.model';
import { ImageRepository } from '../domain/interfaces/ImageRepository.interface';

@Injectable()
export class ImageFinder {
  constructor(private imageRepository: ImageRepository) {}

  public async findByUuid(uuid: string): Promise<Image> {
    const image = await this.imageRepository.findByUuid(uuid);

    if (!image) throw new NotFoundImageException('Image not found');

    return image;
  }

  public async findByEntityUuid(entityUuid: string): Promise<Image[]> {
    const images = await this.imageRepository.findByEntityUuid(entityUuid);

    return images;
  }
}
