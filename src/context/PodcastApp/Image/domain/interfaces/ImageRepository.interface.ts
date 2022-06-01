import { Image } from "../Image.model";

export abstract class ImageRepository {
  abstract save(image: Image): Promise<Image>;
  abstract findByUuid(uuid: string): Promise<Image>;
  abstract findByEntityUuid(entityUuid: string): Promise<Image[]>;
  abstract deleteByUuid(uuid: string): Promise<void>;
  abstract deleteByEntityUuid(entityUuid: string): Promise<void>;
  abstract update(image: Image): Promise<Image>;
}
