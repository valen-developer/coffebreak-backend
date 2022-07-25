import { Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/interfaces/UserRepository.interface';
import { User, UserDto } from '../domain/User.mode';

@Injectable()
export class UserCreator {
  constructor(private userRepository: UserRepository) {}

  public async create(userDto: UserDto): Promise<User> {
    const user = new User(userDto);

    return this.userRepository.save(user);
  }
}
