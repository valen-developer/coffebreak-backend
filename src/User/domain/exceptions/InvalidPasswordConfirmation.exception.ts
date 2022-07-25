import { InvalidException } from "../../../Shared/domain/exceptions/Invalid.exception";

export class InvalidPasswordConfirmationException extends InvalidException {
  constructor() {
    const message = "Password and password confirmation must be the same";
    super(message);
  }
}
