import { NotNullValueObject } from "../../../Shared/domain/valueObjects/NotNull.valueObject";

export class UserPassword extends NotNullValueObject<string> {
  constructor(value: string) {
    super(value, "UserPassword");

    this.validate();
  }

  private validate(): void {
    this.isValidLong();
    this.isValidComposed();
  }

  private isValidLong(): void {
    const MIN_LONG = 8;
    const MAX_LONG = 20;

    const isValid =
      this.value.length >= MIN_LONG && this.value.length <= MAX_LONG;

    if (isValid) return;

    // TODO: make custom error
    throw new Error(
      `UserPassword is invalid. Length must be between ${MIN_LONG} and ${MAX_LONG}`
    );
  }

  private isValidComposed(): void {
    // should contain at least: one lowercase, one upper, one number
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    const isValid = regex.test(this.value);

    if (isValid) return;

    // TODO: make custom error
    throw new Error(
      `UserPassword is invalid. Password must contain at least: one lowercase, one upper, one number`
    );
  }
}
