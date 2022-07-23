import { NotNullValueObject } from "../../../Shared/domain/valueObjects/NotNull.valueObject";

export class ArtistName extends NotNullValueObject<string> {
  constructor(name: string) {
    super(name, "ArtistName");
  }
}
