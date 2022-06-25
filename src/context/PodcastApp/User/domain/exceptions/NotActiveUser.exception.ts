import { InvalidException } from "../../../Shared/domain/exceptions/Invalid.exception";

export class NotActiveUserException extends InvalidException {
  constructor() {
    const message = "User is not active";
    super(message);
  }
}
