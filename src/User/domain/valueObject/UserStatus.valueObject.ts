import { NotNullValueObject } from "../../../Shared/domain/valueObjects/NotNull.valueObject";
import { InvalidUserStatus } from "../exceptions/InvalidUserStatues.exception";

export enum USER_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export class UserStatus extends NotNullValueObject<USER_STATUS> {
  constructor(value: USER_STATUS) {
    super(value, "UserStatus");

    this.verify();
  }

  private verify(): void {
    this.isValid();
  }

  private isValid(): void {
    const isValid = this.value === "ACTIVE" || this.value === "INACTIVE";

    if (isValid) return;

    throw new InvalidUserStatus();
  }

  public isActive(): boolean {
    return this.value === "ACTIVE";
  }
}
