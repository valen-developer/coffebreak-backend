import { ImageDeleter } from "../../Image/application/ImageDeleter";
import { UserRepository } from "../domain/interfaces/UserRepository.interface";

export class UserDeleter {
  constructor(
    private userRepository: UserRepository,
    private imageDeleter: ImageDeleter
  ) {}

  public async delete(uuid: string): Promise<void> {
    const user = await this.userRepository.findByUuid(uuid);
    if (!user) return;

    await this.imageDeleter.deleteByEntityUuid(user.uuid.value);
    await this.userRepository.delete(user.uuid.value);
  }
}
