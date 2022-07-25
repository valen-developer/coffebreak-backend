import { NotFoundException } from "../../../Shared/domain/exceptions/NotFound.exception";

export class NotFoundImageException extends NotFoundException {
  constructor(message: string) {
    super(message);
  }
}
