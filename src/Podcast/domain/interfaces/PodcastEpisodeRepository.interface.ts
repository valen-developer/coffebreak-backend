import { Nullable } from 'src/helpers/types/Nullable.type';
import { Paginated } from 'src/helpers/types/Paginated';
import { Paginator } from '../../../Shared/domain/interfaces/Paginator.interface';
import { PodcastEpisode, PodcastEpisodeDTO } from '../PodcastEpisode.model';

export abstract class PodcastEpisodeRepository {
  abstract save(episode: PodcastEpisode): Promise<void>;
  abstract findLastPublished(): Promise<Nullable<PodcastEpisode>>;
  abstract findByArray(uuids: string[]): Promise<PodcastEpisode[]>;
  abstract filter(
    query: any,
    paginator: Paginator<PodcastEpisodeDTO>,
  ): Promise<PodcastEpisode[]>;
  abstract paginatedFilter(
    query: any,
    paginator: Paginator<PodcastEpisodeDTO>,
  ): Promise<Paginated<PodcastEpisode[], 'episodes'>>;
  abstract count(query: any): Promise<number>;
}
