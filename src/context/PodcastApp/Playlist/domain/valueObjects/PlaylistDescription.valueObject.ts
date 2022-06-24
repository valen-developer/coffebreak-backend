import { NotNullValueObject } from "../../../Shared/domain/valueObjects/NotNull.valueObject";
import { InvalidPlaylistDescriptionLong } from "../exceptions/InvalidPlaylistDescriptionLong.exception";

export class PlaylistDescription extends NotNullValueObject<string> {
  constructor(value: string) {
    super(value, "PlaylistDescription");

    this.validateDescription();
  }

  private validateDescription(): void {
    this.validateLong();
  }

  private validateLong(): void {
    const MAX_LONG = 100;
    const MIN_LONG = 1;

    const isValidLong =
      this.value.length >= MIN_LONG && this.value.length <= MAX_LONG;

    if (isValidLong) return;

    throw new InvalidPlaylistDescriptionLong(
      `PlaylistDescription must be between ${MIN_LONG} and ${MAX_LONG} characters`
    );
  }
}
