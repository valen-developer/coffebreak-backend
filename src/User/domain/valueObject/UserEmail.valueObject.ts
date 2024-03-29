import { NotNullValueObject } from "../../../Shared/domain/valueObjects/NotNull.valueObject";
import { InvalidEmail } from "../exceptions/InvalidEmail.exception";

export class UserEmail extends NotNullValueObject<string> {
  constructor(value: string) {
    super(value, "UserEmail");
    this.validate();
  }

  private validate(): void {
    if (!UserEmail.isValid(this.value)) {
      throw new InvalidEmail();
    }
  }

  public static isValid(email: string): boolean {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }
}
