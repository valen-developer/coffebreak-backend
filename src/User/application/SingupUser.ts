import { Injectable } from '@nestjs/common';
import { Events } from '../../Shared/domain/constants/Events';
import {
  CRYPT_SALT_ROUNDS,
  ICrypt,
} from '../../Shared/domain/interfaces/Crypt.interface';
import { EventEmitter } from '../../Shared/domain/interfaces/EventEmitter';
import { InvalidPasswordConfirmationException } from '../domain/exceptions/InvalidPasswordConfirmation.exception';
import { User } from '../domain/User.mode';
import { UserPassword } from '../domain/valueObject/UserPassword.valueObject';
import { USER_ROLE } from '../domain/valueObject/UserRole.valueObject';
import { USER_STATUS } from '../domain/valueObject/UserStatus.valueObject';
import { UserCreator } from './UserCreator';

@Injectable()
export class SignupUser {
  constructor(
    private userCreator: UserCreator,
    private crypt: ICrypt,
    private eventEmiter: EventEmitter,
  ) {}

  public async signup(request: SingupRequest): Promise<User> {
    this.chekcPassword(request.password, request.passwordConfirmation);

    const user = new User({
      uuid: request.uuid,
      email: request.email,
      password: this.crypt.hash(request.password, CRYPT_SALT_ROUNDS),
      name: request.name,
      role: USER_ROLE.USER,
      status: USER_STATUS.INACTIVE,
    });

    this.eventEmiter.emit(Events.USER_SIGNUP, user);

    return this.userCreator.create(user.toDto());
  }

  private chekcPassword(password: string, passwordConfirm: string): void {
    UserPassword.validate(password);

    const isSame = password === passwordConfirm;
    if (isSame) return;

    throw new InvalidPasswordConfirmationException();
  }
}

export interface SingupRequest {
  uuid: string;
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
}
