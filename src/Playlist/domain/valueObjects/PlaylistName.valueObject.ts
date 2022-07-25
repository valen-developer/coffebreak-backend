import { NotNullValueObject } from "../../../Shared/domain/valueObjects/NotNull.valueObject";

export class PlaylistName extends NotNullValueObject<string> {
  constructor(value: string) {
    super(value, "PlaylistName");
  }
}
