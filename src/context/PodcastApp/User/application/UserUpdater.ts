import { ImageCreator } from "../../Image/application/ImageCreator";
import { ImageUpdater } from "../../Image/application/ImageUpdater";
import { FileUploader } from "../../Shared/domain/interfaces/FileUploader";
import { FileData } from "../../Shared/domain/interfaces/FormDataParser.interface";
import { UUIDGenerator } from "../../Shared/domain/interfaces/UuidGenerator";
import { UserRepository } from "../domain/interfaces/UserRepository.interface";
import { User } from "../domain/User.mode";

export class UserUpdater {
  constructor(
    private userRepository: UserRepository,
    private fileUploader: FileUploader,
    private uuidGenerator: UUIDGenerator,
    private imageUpdater: ImageUpdater
  ) {}

  public async update(user: User, fileData?: FileData): Promise<User> {
    if (fileData) {
      await this.updateImage(fileData, user.uuid.value);
    }

    return this.userRepository.update(user);
  }

  private async updateImage(
    fileData: FileData,
    userUuid: string
  ): Promise<void> {
    const imageUuid = this.uuidGenerator.generate();
    const file: FileData = {
      ...fileData,
      name: imageUuid,
    };

    const imagePath = await this.fileUploader.uploadImage(file);

    await this.imageUpdater.replateForEntity(userUuid, imagePath, imageUuid);
  }
}
