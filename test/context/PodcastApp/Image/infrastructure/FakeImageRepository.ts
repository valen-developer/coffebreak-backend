import { Image } from "../../../../../src/context/PodcastApp/Image/domain/Image.model";
import { ImageRepository } from "../../../../../src/context/PodcastApp/Image/domain/interfaces/ImageRepository.interface";

export class FakeImageRepository implements ImageRepository {
  save(image: Image): Promise<Image> {
    throw new Error("Method not implemented.");
  }
  findByUuid(uuid: string): Promise<Image> {
    throw new Error("Method not implemented.");
  }
  findByEntityUuid(entityUuid: string): Promise<Image[]> {
    throw new Error("Method not implemented.");
  }
  deleteByUuid(uuid: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteByEntityUuid(entityUuid: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(image: Image): Promise<Image> {
    throw new Error("Method not implemented.");
  }
}
