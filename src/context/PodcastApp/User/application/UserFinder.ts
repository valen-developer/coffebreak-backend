import { NotFoundUserException } from "../domain/exceptions/NotUserFound.exception";
import { UserRepository } from "../domain/interfaces/UserRepository.interface";
import { User } from "../domain/User.mode";

export class UserFinder {
  constructor(private userRepository: UserRepository) {}

  public async findByUuid(uuid: string): Promise<User> {
    const user = await this.userRepository.findByUuid(uuid);

    if (!user) {
      throw new NotFoundUserException();
    }

    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundUserException();
    }

    return user;
  }
}
