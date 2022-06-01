import { UserRepository } from "../domain/interfaces/UserRepository.interface";
import { User } from "../domain/User.mode";

export class UserFinder {
  constructor(private userRepository: UserRepository) {}

  public async findByUuid(uuid: string): Promise<User> {
    return this.userRepository.findByUuid(uuid);
  }

  public async findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }
}
