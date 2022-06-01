import { UserRepository } from "../../domain/interfaces/UserRepository.interface";
import { User, UserDto } from "../../domain/User.mode";
import { MongoUser } from "./MongoUserSchema";

export class MongoUserRepository implements UserRepository {
  public async save(user: User): Promise<User> {
    const userSchema = new MongoUser(user.toDto());
    await userSchema.save();

    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const userDto: UserDto = await MongoUser.findOne({ email });

    return new User(userDto);
  }

  public async findByUuid(uuid: string): Promise<User> {
    const userDto: UserDto = await MongoUser.findOne({ uuid });

    return new User(userDto);
  }

  public async update(user: User): Promise<User> {
    const userDto: UserDto = await MongoUser.findOneAndUpdate(
      { uuid: user.uuid.value },
      user.toDto(),
      { new: true }
    );

    return new User(userDto);
  }

  public async delete(uuid: string): Promise<void> {
    await MongoUser.deleteOne({ uuid });
  }
}
