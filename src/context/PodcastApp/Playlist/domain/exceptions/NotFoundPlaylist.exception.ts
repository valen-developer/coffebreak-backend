import { NotFoundException } from "../../../Shared/domain/exceptions/NotFound.exception";

export class NotFoundPlaylistException extends NotFoundException {
  constructor(message: string) {
    super(message);
  }
}
