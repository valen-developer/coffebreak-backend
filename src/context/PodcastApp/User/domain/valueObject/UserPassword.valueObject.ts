import { NotNullValueObject } from "../../../Shared/domain/valueObjects/NotNull.valueObject";
import { InvalidPasswordException } from "../exceptions/InvalidPassword.exception";

export class UserPassword extends NotNullValueObject<string> {
  constructor(value: string) {
    super(value, "UserPassword");
  }

  public static randomPassword(): string {
    const abc = "abcdefghijklmnopqrstuvwxyz";
    const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const special = "!@#$%^&*()_+";

    let randomPassword = "";
    let isValid = false;

    while (!isValid) {
      randomPassword += abc[Math.floor(Math.random() * abc.length)];
      randomPassword += ABC[Math.floor(Math.random() * ABC.length)];
      randomPassword += numbers[Math.floor(Math.random() * numbers.length)];
      randomPassword += special[Math.floor(Math.random() * special.length)];

      const isValidLong =
        randomPassword.length === InvalidPasswordException.MAX_LENGTH;
      const isValidComposed =
        InvalidPasswordException.isValidComposed(randomPassword);
      isValid = isValidLong && isValidComposed;
    }

    return randomPassword;
  }

  public static validate(value: string): void {
    this.isValidLong(value);
    this.isValidComposed(value);
  }

  private static isValidLong(value: string): void {
    const isValid = InvalidPasswordException.isValidLong(value);

    if (isValid) return;

    throw new InvalidPasswordException(value);
  }

  private static isValidComposed(value: string): void {
    const isValid = InvalidPasswordException.isValidComposed(value);

    if (isValid) return;

    throw new InvalidPasswordException(value);
  }
}
