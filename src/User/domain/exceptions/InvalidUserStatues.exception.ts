import { InvalidException } from "../../../Shared/domain/exceptions/Invalid.exception";
import { USER_STATUS } from "../valueObject/UserStatus.valueObject";

export class InvalidUserStatus extends InvalidException {
  constructor() {
    let allowedStatuses = Object.values(USER_STATUS);
    allowedStatuses = allowedStatuses.slice(0, allowedStatuses.length / 2);

    const message = `UserStatus is invalid. Allowed statuses: ${allowedStatuses.join(
      ", "
    )}`;
    super(message);
  }
}
