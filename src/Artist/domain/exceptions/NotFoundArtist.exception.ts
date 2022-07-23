import { NotFoundException } from "../../../Shared/domain/exceptions/NotFound.exception";

export class NotFoundArtistException extends NotFoundException {
  constructor() {
    super("Artist not found");
  }
}
