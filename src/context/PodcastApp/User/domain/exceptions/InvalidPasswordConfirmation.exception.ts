import { InvalidException } from "../../../Shared/domain/exceptions/Invalid.exception";

export class InvalidPasswordConfirmationException extends InvalidException {
  constructor(message: string) {
    super(message);
  }
}
