import { InvalidException } from "../../../Shared/domain/exceptions/Invalid.exception";
import { USER_ROLE } from "../valueObject/UserRole.valueObject";

export class InvalidUserRole extends InvalidException {
  constructor() {
    let allowedRoles = Object.values(USER_ROLE);
    allowedRoles = allowedRoles.slice(0, allowedRoles.length / 2);

    const message = `UserRole is invalid. Allowed roles: ${allowedRoles.join(
      ", "
    )}`;
    super(message);
  }
}
