import { NotFoundException } from "../../../Shared/domain/exceptions/NotFound.exception";

export class NotFoundEpisodeException extends NotFoundException {
  constructor(message?: string) {
    super(message ?? "Episode not found");
  }
}
