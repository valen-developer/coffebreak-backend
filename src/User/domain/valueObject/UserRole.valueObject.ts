import { NotNullValueObject } from "../../../Shared/domain/valueObjects/NotNull.valueObject";
import { InvalidUserRole } from "../exceptions/InvalidUserRole.exception";

export enum USER_ROLE {
  ADMIN = "ADMIN",
  USER = "USER",
}

export class UserRole extends NotNullValueObject<USER_ROLE> {
  constructor(value: USER_ROLE) {
    super(value, "UserRole");

    this.validate();
  }

  private validate(): void {
    this.isValid();
  }

  private isValid(): void {
    const isValid = this.value === "ADMIN" || this.value === "USER";

    if (isValid) return;

    throw new InvalidUserRole();
  }
}
