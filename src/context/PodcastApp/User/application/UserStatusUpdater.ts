import { UserRepository } from "../domain/interfaces/UserRepository.interface";
import { User } from "../domain/User.mode";

export class UserStatusUpdater {
  constructor(private userRepository: UserRepository) {}

  public async activateUser(uuid: string): Promise<void> {
    const user = await this.userRepository.findByUuid(uuid);
    user.activate();
    await this.userRepository.update(user);
  }

  public async deactivateUser(uuid: string): Promise<void> {
    const user = await this.userRepository.findByUuid(uuid);
    user.deactivate();

    await this.userRepository.update(user);
  }
}
