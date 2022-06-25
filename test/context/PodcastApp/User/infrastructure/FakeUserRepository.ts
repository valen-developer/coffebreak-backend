import { NotFoundUserException } from "../../../../../src/context/PodcastApp/User/domain/exceptions/NotUserFound.exception";
import { UserRepository } from "../../../../../src/context/PodcastApp/User/domain/interfaces/UserRepository.interface";
import { User } from "../../../../../src/context/PodcastApp/User/domain/User.mode";

export class FakeUserRepository implements UserRepository {
  private users: User[] = [];

  public clear(): void {
    this.users = [];
  }

  save(user: User): Promise<User> {
    // check if user already exists by uuid and email
    const userExists = this.users.find(
      (user) =>
        user.uuid.value === user.uuid.value ||
        user.email.value === user.email.value
    );

    if (userExists) {
      throw new Error("User already exists");
    }

    this.users.push(user);

    return Promise.resolve(user);
  }

  findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email.value === email);

    if (!user) throw new NotFoundUserException();

    return Promise.resolve(user);
  }

  findByUuid(uuid: string): Promise<User> {
    const user = this.users.find((user) => user.uuid.value === uuid);

    if (!user) throw new NotFoundUserException();

    return Promise.resolve(user);
  }

  async update(user: User): Promise<User> {
    const userExists = this.findByUuid(user.uuid.value);

    if (!userExists) throw new NotFoundUserException();

    await this.delete(user.uuid.value);

    return this.save(user);
  }

  async delete(uuid: string): Promise<void> {
    this.users = [...this.users.filter((user) => user.uuid.value !== uuid)];
  }
}
