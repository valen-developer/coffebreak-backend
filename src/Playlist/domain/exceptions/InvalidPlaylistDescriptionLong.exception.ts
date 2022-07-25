import { InvalidException } from "../../../Shared/domain/exceptions/Invalid.exception";

export class InvalidPlaylistDescriptionLong extends InvalidException {
  constructor(message: string) {
    super(message);
  }
}
