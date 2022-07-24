import { Injectable } from '@nestjs/common';
import { ImageUpdater } from '../../Image/application/ImageUpdater';
import { FileUploader } from '../../Shared/domain/interfaces/FileUploader';
import { FileData } from '../../Shared/domain/interfaces/FormDataParser.interface';
import { UUIDGenerator } from '../../Shared/domain/interfaces/UuidGenerator';
import { UserRepository } from '../domain/interfaces/UserRepository.interface';
import { User } from '../domain/User.mode';

@Injectable()
export class UserUpdater {
  constructor(
    private userRepository: UserRepository,
    private fileUploader: FileUploader,
    private uuidGenerator: UUIDGenerator,
    private imageUpdater: ImageUpdater,
  ) {}

  public async update(request: UpdateRequest): Promise<User> {
    const { uuid, name, email, fileData } = request;

    const oldUser = await this.userRepository.findByUuid(uuid);
    const user = new User({
      ...oldUser.toDto(),
      name: name ?? oldUser.name.value,
      email: email ?? oldUser.email.value,
    });

    if (fileData) {
      await this.updateImage(fileData, oldUser.uuid.value);
    }

    return this.userRepository.update(user);
  }

  private async updateImage(
    fileData: FileData,
    userUuid: string,
  ): Promise<void> {
    const imageUuid = this.uuidGenerator.generate();
    const file: FileData = {
      ...fileData,
      name: imageUuid,
    };

    const imagePath = await this.fileUploader.uploadImage(file);

    await this.imageUpdater.replaceForEntity(userUuid, imagePath, imageUuid);
  }
}

interface UpdateRequest {
  uuid: string;
  name?: string;
  email?: string;
  fileData?: FileData;
}
