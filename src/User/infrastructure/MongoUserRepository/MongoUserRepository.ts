import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Nullable } from 'src/helpers/types/Nullable.type';

import { NotFoundUserException } from '../../domain/exceptions/NotUserFound.exception';
import { UserRepository } from '../../domain/interfaces/UserRepository.interface';
import { User, UserDto } from '../../domain/User.mode';
import { MongoUserDocument, USER_NAME } from './MongoUserSchema';

@Injectable()
export class MongoUserRepository implements UserRepository {
  constructor(
    @InjectModel(USER_NAME) private MongoUser: Model<MongoUserDocument>,
  ) {}

  public async save(user: User): Promise<User> {
    const userSchema = new this.MongoUser(user.toDto());
    await userSchema.save();

    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const userDto: Nullable<UserDto> = await this.MongoUser.findOne({ email });

    if (!userDto) {
      throw new NotFoundUserException();
    }

    return new User(userDto);
  }

  public async findByUuid(uuid: string): Promise<User> {
    const userDto: Nullable<UserDto> = await this.MongoUser.findOne({ uuid });
    if (!userDto) throw new NotFoundUserException();

    return new User(userDto);
  }

  public async update(user: User): Promise<User> {
    const userDto: Nullable<UserDto> = await this.MongoUser.findOneAndUpdate(
      { uuid: user.uuid.value },
      user.toDto(),
      { new: true },
    );

    if (!userDto) throw new NotFoundUserException();

    return new User(userDto);
  }

  public async delete(uuid: string): Promise<void> {
    await this.MongoUser.deleteOne({ uuid });
  }
}
