import { NotFoundException } from "../../../Shared/domain/exceptions/NotFound.exception";

export class NotFoundUserException extends NotFoundException {
  constructor(message: string) {
    super(message);
  }
}
