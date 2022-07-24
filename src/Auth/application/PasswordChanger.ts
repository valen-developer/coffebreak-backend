import { Injectable } from '@nestjs/common';
import { InvalidPasswordConfirmationException } from 'src/User/domain/exceptions/InvalidPasswordConfirmation.exception';
import { NotFoundUserException } from 'src/User/domain/exceptions/NotUserFound.exception';
import { UserRepository } from 'src/User/domain/interfaces/UserRepository.interface';
import { User } from 'src/User/domain/User.mode';
import { USER_STATUS } from 'src/User/domain/valueObject/UserStatus.valueObject';
import { ICrypt } from '../../Shared/domain/interfaces/Crypt.interface';

@Injectable()
export class PasswordChanger {
  constructor(private userRepository: UserRepository, private crypt: ICrypt) {}

  public async changePassword(params: ChangePasswordDto): Promise<void> {
    const { userUuid, password, passwordConfirmation } = params;
    this.isPasswordMatch(password, passwordConfirmation);

    const user = await this.userRepository.findByUuid(userUuid);

    if (!user) throw new NotFoundUserException();

    const encryptedPassword = this.crypt.hash(password, 10);

    const userUpdated = new User({
      ...user.toDto(),
      password: encryptedPassword,
      status: USER_STATUS.ACTIVE,
    });

    await this.userRepository.update(userUpdated);
  }

  private isPasswordMatch(
    password: string,
    passwordConfirmation: string,
  ): void {
    const isMatch = password === passwordConfirmation;

    if (!isMatch) {
      throw new InvalidPasswordConfirmationException();
    }
  }
}

export interface ChangePasswordDto {
  userUuid: string;
  password: string;
  passwordConfirmation: string;
}
