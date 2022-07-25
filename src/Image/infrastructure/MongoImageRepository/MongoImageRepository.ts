import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Nullable } from 'src/helpers/types/Nullable.type';

import { NotFoundImageException } from '../../domain/exceptions/NotFoundImage.exception';
import { Image, ImageDTO } from '../../domain/Image.model';
import { ImageRepository } from '../../domain/interfaces/ImageRepository.interface';
import { IMAGE_NAME, MongoImageDocument } from './MongoImageSchema';

@Injectable()
export class MongoImageRepository implements ImageRepository {
  constructor(
    @InjectModel(IMAGE_NAME)
    private MongoImageSchema: Model<MongoImageDocument>,
  ) {}

  public async save(image: Image): Promise<Image> {
    const imageSchema = new this.MongoImageSchema(image.toDTO());
    await imageSchema.save();

    return image;
  }

  public async update(image: Image): Promise<Image> {
    await this.MongoImageSchema.updateOne({ uuid: image.uuid }, image.toDTO());

    return image;
  }

  public async findByUuid(uuid: string): Promise<Image> {
    const imageSchema: Nullable<ImageDTO> = await this.MongoImageSchema.findOne(
      { uuid },
    );

    if (!imageSchema) {
      throw new NotFoundImageException('Image not found');
    }

    return new Image(imageSchema);
  }

  public async findByEntityUuid(entityUuid: string): Promise<Image[]> {
    const imageSchemas: ImageDTO[] = await this.MongoImageSchema.find({
      entityUuid,
    });

    return imageSchemas.map((imageSchema) => new Image(imageSchema));
  }

  public async deleteByUuid(uuid: string): Promise<void> {
    await this.MongoImageSchema.deleteOne({ uuid });
  }

  public async deleteByEntityUuid(entityUuid: string): Promise<void> {
    await this.MongoImageSchema.deleteMany({ entityUuid });
  }
}
