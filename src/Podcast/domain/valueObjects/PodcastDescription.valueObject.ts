import { NotNullValueObject } from "../../../Shared/domain/valueObjects/NotNull.valueObject";

export class PodcastDescription extends NotNullValueObject<string> {
  constructor(value: string) {
    super(value, "PodcastTitle");
  }
}
