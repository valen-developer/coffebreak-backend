import { NotFoundException } from "../../../Shared/domain/exceptions/NotFound.exception";

export class NotFoundUserException extends NotFoundException {
  constructor() {
    const message = "User not found";
    super(message);
  }
}
