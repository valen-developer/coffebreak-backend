import { USER_ROLE } from "../../../User/domain/valueObject/UserRole.valueObject";
import { USER_STATUS } from "../../../User/domain/valueObject/UserStatus.valueObject";

export abstract class Faker {
  abstract name(): string;
  abstract uuid(): string;
  abstract email(): string;
  abstract paragraph(max: number): string;
  abstract userRole(): USER_ROLE;
  abstract password(): string;
  abstract userStatus(): USER_STATUS;
}
