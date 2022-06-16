import { FileUploader } from "../../Shared/domain/interfaces/FileUploader";
import { UUIDGenerator } from "../../Shared/domain/interfaces/UuidGenerator";
import { Image } from "../domain/Image.model";
import { ImageRepository } from "../domain/interfaces/ImageRepository.interface";

export class ImageDuplicator {
  constructor(
    private imageRepository: ImageRepository,
    private uuidGenerator: UUIDGenerator,
    private fileUploader: FileUploader
  ) {}

  public async duplicate(
    imageUuid: string,
    entityUuid: string,
    newName: string
  ): Promise<Image> {
    const image = await this.imageRepository.findByUuid(imageUuid);

    const newPath = await this.fileUploader.duplicateImage(
      image.path.value,
      newName
    );

    const newImage = new Image({
      uuid: this.uuidGenerator.generate(),
      path: newPath,
      entityUuid,
    });

    return await this.imageRepository.save(newImage);
  }
}
