import { PodcastDuration } from 'src/Podcast/domain/valueObjects/PodcastDuration.valueObject';
import { Dated, DatedDTO } from 'src/Shared/domain/Dated.model';
import { UUID } from 'src/Shared/domain/valueObjects/Uuid.valueObject';
import { EpisodeTimeTrackerTime } from './valueObjects/EpisodeTimeTrackerTime.valueObject';

export class EpisodeTimeTracker extends Dated {
  public readonly uuid: UUID;

  public readonly episodeUuid: UUID;
  public readonly userUuid: UUID;
  public readonly time: EpisodeTimeTrackerTime;
  public readonly episodeDuration: PodcastDuration;

  constructor(params: EpisodeTimeTrackerDTO) {
    super(params);

    this.uuid = new UUID(params.uuid);
    this.episodeUuid = new UUID(params.episodeUuid);
    this.userUuid = new UUID(params.userUuid);
    this.time = new EpisodeTimeTrackerTime(params.time);
    this.episodeDuration = new PodcastDuration(params.episodeDuration);
  }

  public toDto(): EpisodeTimeTrackerDTO {
    return {
      uuid: this.uuid.value,
      episodeUuid: this.episodeUuid.value,
      userUuid: this.userUuid.value,
      time: this.time.value,
      episodeDuration: this.episodeDuration.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }
}

export interface EpisodeTimeTrackerDTO extends DatedDTO {
  uuid: string;
  episodeUuid: string;
  userUuid: string;
  time: number;
  episodeDuration: number;
}
