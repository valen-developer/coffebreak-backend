import { DatedQuery } from 'src/Shared/domain/Dated.model';

export interface EpisodeTimeTrackerQuery extends DatedQuery {
  uuid_equals?: string;
  episodeUuid_equals?: string;
  userUuid_equals?: string;
  time_equals?: number;
}
