import { ImageCreator } from "../../Image/application/ImageCreator";
import { Image } from "../../Image/domain/Image.model";
import { ImageDownloader } from "../../Shared/application/ImageDownloader";
import { FileUploader } from "../../Shared/domain/interfaces/FileUploader";
import { UUIDGenerator } from "../../Shared/domain/interfaces/UuidGenerator";
import { UserRepository } from "../domain/interfaces/UserRepository.interface";
import { User } from "../domain/User.mode";
import { UserPassword } from "../domain/valueObject/UserPassword.valueObject";
import { USER_ROLE } from "../domain/valueObject/UserRole.valueObject";
import { USER_STATUS } from "../domain/valueObject/UserStatus.valueObject";

export class GoogleSignup {
  constructor(
    private userRepository: UserRepository,
    private imageDownloader: ImageDownloader,
    private fileUploader: FileUploader,
    private imageCreator: ImageCreator,
    private uuid: UUIDGenerator
  ) {}

  public async signup(request: GoogleSignupRequest): Promise<void> {
    const userFound = await this.userRepository
      .findByEmail(request.email)
      .catch(() => null);
    if (userFound) return;

    const { imageUrl } = request;

    const user = new User({
      uuid: this.uuid.generate(),
      email: request.email,
      name: request.name,
      password: UserPassword.randomPassword(),
      role: USER_ROLE.USER,
      status: USER_STATUS.ACTIVE,
    });

    if (imageUrl) await this.extractImage(imageUrl, user);
    await this.userRepository.save(user);
  }

  private async extractImage(imageUrl: string, user: User): Promise<void> {
    const fileData = await this.imageDownloader.download(imageUrl);
    const path = await this.fileUploader.uploadImage(fileData);

    await this.imageCreator.create({
      uuid: this.uuid.generate(),
      entityUuid: user.uuid.value,
      path,
    });
  }
}

export interface GoogleSignupRequest {
  email: string;
  name: string;
  imageUrl?: string;
}
