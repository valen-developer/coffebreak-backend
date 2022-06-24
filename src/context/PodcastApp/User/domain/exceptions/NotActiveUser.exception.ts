import { InvalidException } from "../../../Shared/domain/exceptions/Invalid.exception";

export class NotActiveUserException extends InvalidException {
  constructor(message: string) {
    super(message);
  }
}
