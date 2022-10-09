import { Paginated } from 'src/helpers/types/Paginated';
import { Paginator } from 'src/Shared/domain/interfaces/Paginator.interface';
import {
  EpisodeTimeTracker,
  EpisodeTimeTrackerDTO,
} from '../EpisodeTimeTracker.model';

export abstract class EpisodeTimeTrackerRepository {
  abstract save(episodeTimeTracker: EpisodeTimeTracker): Promise<void>;
  abstract update(episodeTimeTracker: EpisodeTimeTracker): Promise<void>;
  abstract find(uuid: string): Promise<EpisodeTimeTracker>;

  abstract findByEpisode(episodeUuid: string): Promise<EpisodeTimeTracker[]>;
  abstract findByUser(userUuid: string): Promise<EpisodeTimeTracker[]>;
  abstract filter(
    query: any,
    paginator: Paginator<EpisodeTimeTrackerDTO>,
  ): Promise<Paginated<EpisodeTimeTracker[], 'trackers'>>;
  abstract count(query: any): Promise<number>;
  abstract delete(uuid: string): Promise<void>;
}
