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

  public async duplicate(imageUuid: string): Promise<Image> {
    const image = await this.imageRepository.findByUuid(imageUuid);
    const newUuid = this.uuidGenerator.generate();

    const newPath = await this.fileUploader.duplicateImage(
      image.path.value,
      newUuid
    );

    const newImage = new Image({
      uuid: this.uuidGenerator.generate(),
      path: newPath,
      entityUuid: image.entityUuid.value,
    });

    return await this.imageRepository.save(newImage);
  }
}
