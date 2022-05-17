import { InvalidFormatException } from "../../../Shared/domain/exceptions/InvalidFormat.exception";
import { NotNullValueObject } from "../../../Shared/domain/valueObjects/NotNull.valueObject";

export class PodcastDuration extends NotNullValueObject<number> {
  constructor(value: number) {
    super(value, "PodcastDuration");
  }

  /**
   *
   * @param value HH:MM:SS format
   */
  public static fromString(value: string): PodcastDuration {
    if (value.split(":").length !== 3)
      throw new InvalidFormatException("HH:MM:SS");

    const [hours, minutes, seconds] = value.split(":");

    return new PodcastDuration(
      parseInt(hours, 10) * 60 * 60 +
        parseInt(minutes, 10) * 60 +
        parseInt(seconds, 10)
    );
  }
}
