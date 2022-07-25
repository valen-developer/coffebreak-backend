import { NotNullValueObject } from 'src/Shared/domain/valueObjects/NotNull.valueObject';

export class EpisodeTrackDescription extends NotNullValueObject<string> {
  constructor(value: string) {
    super(value, 'EpisodeTrackDescription');
  }
}
