import { EpisodeTrack } from '../EpisodeTrack.model';

export abstract class EpisodeTrackRepository {
  abstract save(episodeTrack: EpisodeTrack): Promise<EpisodeTrack>;
  abstract findByEpisode(episodeUuid: string): Promise<EpisodeTrack[]>;
}
