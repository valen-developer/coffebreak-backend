import { InvalidException } from 'src/Shared/domain/exceptions/Invalid.exception';
import { NotNullValueObject } from 'src/Shared/domain/valueObjects/NotNull.valueObject';

export class EpisodeTrackTime extends NotNullValueObject<string> {
  constructor(value: string) {
    super(value, 'EpisodeTrackTime');

    this.isValidFormat(value);
  }

  private isValidFormat(value: string): void {
    //Format valid: 00:00:00
    const isValid = /^\d{2}:\d{2}:\d{2}$/.test(value);

    if (!isValid)
      throw new InvalidException(
        `Invalid format for EpisodeTrackTime: ${value}`,
      );
  }
}
