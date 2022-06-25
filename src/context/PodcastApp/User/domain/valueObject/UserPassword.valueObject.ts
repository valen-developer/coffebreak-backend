import { NotNullValueObject } from "../../../Shared/domain/valueObjects/NotNull.valueObject";
import { InvalidPasswordException } from "../exceptions/InvalidPassword.exception";

export class UserPassword extends NotNullValueObject<string> {
  constructor(value: string) {
    super(value, "UserPassword");
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
