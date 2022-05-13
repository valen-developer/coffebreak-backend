import { Image, ImageDTO } from "../../domain/Image.model";
import { ImageRepository } from "../../domain/interfaces/ImageRepository.interface";
import { MongoImageSchema } from "./MongoImageSchema";

export class MongoImageRepository implements ImageRepository {
  public async save(image: Image): Promise<Image> {
    const imageSchema = new MongoImageSchema(image.toDTO());
    await imageSchema.save();

    return image;
  }

  public async findByUuid(uuid: string): Promise<Image> {
    const imageSchema = await MongoImageSchema.findOne({ uuid });

    if (!imageSchema) {
      // TODO: custom error
      throw new Error("Image not found");
    }

    return new Image(imageSchema.toDTO());
  }

  public async findByEntityUuid(entityUuid: string): Promise<Image[]> {
    const imageSchemas: ImageDTO[] = await MongoImageSchema.find({
      entityUuid,
    });

    return imageSchemas.map((imageSchema) => new Image(imageSchema));
  }

  public async deleteByUuid(uuid: string): Promise<void> {
    await MongoImageSchema.deleteOne({ uuid });
  }

  public async deleteByEntityUuid(entityUuid: string): Promise<void> {
    await MongoImageSchema.deleteMany({ entityUuid });
  }
}
