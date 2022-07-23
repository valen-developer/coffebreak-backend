import { Nullable } from 'src/helpers/types/Nullable.type';
import { Paginator } from '../../../Shared/domain/interfaces/Paginator.interface';
import { PodcastEpisode, PodcastEpisodeDTO } from '../PodcastEpisode.model';

export abstract class PodcastEpisodeRepository {
  abstract save(episode: PodcastEpisode): Promise<void>;
  abstract filter(
    query: any,
    paginator: Paginator<PodcastEpisodeDTO>,
  ): Promise<PodcastEpisode[]>;
  abstract findLastPublished(): Promise<Nullable<PodcastEpisode>>;
  abstract findByArray(uuids: string[]): Promise<PodcastEpisode[]>;
}
