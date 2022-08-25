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
  ): Promise<EpisodeTimeTracker[]>;
  abstract delete(uuid: string): Promise<void>;
}
