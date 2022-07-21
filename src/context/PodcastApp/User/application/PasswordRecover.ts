import { Events } from "../../Shared/domain/constants/Events";
import { InvalidException } from "../../Shared/domain/exceptions/Invalid.exception";
import {
  CRYPT_SALT_ROUNDS,
  ICrypt,
} from "../../Shared/domain/interfaces/Crypt.interface";
import { EventEmitter } from "../../Shared/domain/interfaces/EventEmitter";
import { InvalidPasswordConfirmationException } from "../domain/exceptions/InvalidPasswordConfirmation.exception";
import { UserRepository } from "../domain/interfaces/UserRepository.interface";
import { User } from "../domain/User.mode";
import { UserPassword } from "../domain/valueObject/UserPassword.valueObject";
import { USER_STATUS } from "../domain/valueObject/UserStatus.valueObject";

export class PasswordRecover {
  constructor(
    private userRepository: UserRepository,
    private crypt: ICrypt,
    private eventEmitter: EventEmitter
  ) {}

  public async recovery(params: PasswordRecoverParams): Promise<void> {
    const { password, passwordConfirmation, email } = params;
    this.checkParams(params);
    this.checkPassword(password, passwordConfirmation);

    const user = await this.userRepository.findByEmail(email);
    const passwordHash = this.crypt.hash(password, CRYPT_SALT_ROUNDS);

    const updatedUser = new User({
      ...user.toDto(),
      password: passwordHash,
      status: USER_STATUS.INACTIVE,
    });

    this.eventEmitter.emit(Events.USER_RECOVERY_PASSWORD, updatedUser);

    await this.userRepository.update(updatedUser);
  }

  private checkParams(params: PasswordRecoverParams): void {
    const { password, passwordConfirmation, email } = params;
    if (!password || !passwordConfirmation || !email)
      throw new InvalidException("Missing params");
  }

  private checkPassword(password: string, passwordConfirmation: string): void {
    const isSame = password === passwordConfirmation;
    if (!isSame) throw new InvalidPasswordConfirmationException();

    UserPassword.validate(password);
  }
}

export interface PasswordRecoverParams {
  email: string;
  password: string;
  passwordConfirmation: string;
}
