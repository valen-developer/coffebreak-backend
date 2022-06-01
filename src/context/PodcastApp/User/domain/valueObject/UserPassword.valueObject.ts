import { NotNullValueObject } from "../../../Shared/domain/valueObjects/NotNull.valueObject";

export class UserPassword extends NotNullValueObject<string> {
  constructor(value: string) {
    super(value, "UserPassword");
  }

  public static validate(value: string): void {
    this.isValidLong(value);
    this.isValidComposed(value);
  }

  private static isValidLong(value: string): void {
    const MIN_LONG = 8;
    const MAX_LONG = 20;

    const isValid = value.length >= MIN_LONG && value.length <= MAX_LONG;

    if (isValid) return;

    // TODO: make custom error
    throw new Error(
      `UserPassword is invalid. Length must be between ${MIN_LONG} and ${MAX_LONG}`
    );
  }

  private static isValidComposed(value: string): void {
    // should contain at least: one lowercase, one upper, one number
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    const isValid = regex.test(value);

    if (isValid) return;

    // TODO: make custom error
    throw new Error(
      `UserPassword is invalid. Password must contain at least: one lowercase, one upper, one number`
    );
  }
}
