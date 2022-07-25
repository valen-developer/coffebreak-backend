import { Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/interfaces/UserRepository.interface';
import { User } from '../domain/User.mode';

@Injectable()
export class UserValidator {
  constructor(private userRepository: UserRepository) {}

  public async validateUser(user: User): Promise<boolean> {
    user.activate();
    await this.userRepository.update(user);
    return true;
  }
}
