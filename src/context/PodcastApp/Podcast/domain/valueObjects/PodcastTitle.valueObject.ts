import { NotNullValueObject } from "../../../Shared/domain/valueObjects/NotNull.valueObject";

export class PodcastTitle extends NotNullValueObject<string> {
  constructor(value: string) {
    super(value, "PodcastTitle");
  }
}
