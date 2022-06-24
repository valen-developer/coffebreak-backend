import { InvalidException } from "../../../Shared/domain/exceptions/Invalid.exception";

export class InvalidPasswordException extends InvalidException {
  constructor(message: string) {
    super(message);
  }
}
