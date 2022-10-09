import { NotNullValueObject } from 'src/Shared/domain/valueObjects/NotNull.valueObject';

export class EpisodeTimeTrackerTime extends NotNullValueObject<number> {
  constructor(value: number) {
    super(value, 'EpisodeTimeTrackerTime');
  }
}
