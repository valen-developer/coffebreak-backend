import { Image } from "../../../../../src/context/PodcastApp/Image/domain/Image.model";
import { ImageRepository } from "../../../../../src/context/PodcastApp/Image/domain/interfaces/ImageRepository.interface";

export class FakeImageRepository implements ImageRepository {
  private images: Image[] = [];

  save(image: Image): Promise<Image> {
    // check if image already exists
    const existingImage = this.images.find(
      (i) => i.uuid.value === image.uuid.value
    );

    if (existingImage) {
      return Promise.resolve(existingImage);
    }

    this.images.push(image);
    return Promise.resolve(image);
  }

  findByUuid(uuid: string): Promise<Image> {
    const image = this.images.find((i) => i.uuid.value === uuid);

    if (!image) {
      throw new Error("Image not found");
    }

    return Promise.resolve(image);
  }

  findByEntityUuid(entityUuid: string): Promise<Image[]> {
    const images = this.images.filter((i) => i.entityUuid.value === entityUuid);

    if (!images) {
      throw new Error("Images not found");
    }

    return Promise.resolve(images);
  }

  deleteByUuid(uuid: string): Promise<void> {
    this.images = this.images.filter((i) => i.uuid.value !== uuid);

    return Promise.resolve();
  }

  deleteByEntityUuid(entityUuid: string): Promise<void> {
    this.images = this.images.filter((i) => i.entityUuid.value !== entityUuid);

    return Promise.resolve();
  }

  update(image: Image): Promise<Image> {
    const existingImage = this.images.find(
      (i) => i.uuid.value === image.uuid.value
    );

    if (!existingImage) {
      throw new Error("Image not found");
    }

    return Promise.resolve(image);
  }
}
