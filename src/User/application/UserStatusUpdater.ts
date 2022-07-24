import { Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/interfaces/UserRepository.interface';
import { User } from '../domain/User.mode';

@Injectable()
export class UserStatusUpdater {
  constructor(private userRepository: UserRepository) {}

  public async activateUser(uuid: string): Promise<User> {
    const user = await this.userRepository.findByUuid(uuid);
    user.activate();
    return await this.userRepository.update(user);
  }

  public async deactivateUser(uuid: string): Promise<User> {
    const user = await this.userRepository.findByUuid(uuid);
    user.deactivate();

    return await this.userRepository.update(user);
  }
}
