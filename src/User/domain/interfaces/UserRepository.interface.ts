import { User } from "../User.mode";

export abstract class UserRepository {
  abstract save(user: User): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract findByUuid(uuid: string): Promise<User>;

  abstract update(user: User): Promise<User>;
  abstract delete(uuid: string): Promise<void>;
}
