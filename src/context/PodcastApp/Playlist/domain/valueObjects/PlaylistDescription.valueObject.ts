import { NotNullValueObject } from "../../../Shared/domain/valueObjects/NotNull.valueObject";

export class PlaylistDescription extends NotNullValueObject<string> {
  constructor(value: string) {
    super(value, "PlaylistDescription");
  }
}
