import { UserRepository } from "../domain/interfaces/UserRepository.interface";

export class UserDeleter {
  constructor(private userRepository: UserRepository) {}

  public async delete(uuid: string): Promise<void> {
    return this.userRepository.delete(uuid);
  }
}
