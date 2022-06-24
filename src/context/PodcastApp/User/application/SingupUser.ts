import {
  CRYPT_SALT_ROUNDS,
  ICrypt,
} from "../../Shared/domain/interfaces/Crypt.interface";
import { InvalidPasswordConfirmationException } from "../domain/exceptions/InvalidPasswordConfirmation.exception";
import { User } from "../domain/User.mode";
import { UserPassword } from "../domain/valueObject/UserPassword.valueObject";
import { UserCreator } from "./UserCreator";

export class SignupUser {
  constructor(private userCreator: UserCreator, private crypt: ICrypt) {}

  public async signup(request: SingupRequest): Promise<User> {
    this.chekcPassword(request.password, request.passwordConfirmation);

    const user = new User({
      uuid: request.uuid,
      email: request.email,
      password: this.crypt.hash(request.password, CRYPT_SALT_ROUNDS),
      name: request.name,
      role: "USER",
      status: "INACTIVE",
    });

    return this.userCreator.create(user.toDto());
  }

  private chekcPassword(password: string, passwordConfirm: string): void {
    UserPassword.validate(password);

    const isSame = password === passwordConfirm;
    if (isSame) return;

    throw new InvalidPasswordConfirmationException(
      "Password and password confirm are not the same"
    );
  }
}

export interface SingupRequest {
  uuid: string;
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
}
