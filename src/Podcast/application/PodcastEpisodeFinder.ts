import { Injectable } from '@nestjs/common';
import { Nullable } from 'src/helpers/types/Nullable.type';
import { Paginator } from '../../Shared/domain/interfaces/Paginator.interface';
import { QueryBuilder } from '../../Shared/domain/interfaces/QueryBuilder.interface';
import { NotFoundEpisodeException } from '../domain/exceptions/NotFoundEpisode.exception';
import { PodcastEpisodeRepository } from '../domain/interfaces/PodcastEpisodeRepository.interface';
import {
  PodcastEpisode,
  PodcastEpisodeDTO,
} from '../domain/PodcastEpisode.model';
import { PodcastEpisodeQuery } from '../domain/PodcastEpisodeQuery';

@Injectable()
export class PodcastEpisodeFinder {
  constructor(
    private podcastEpisodeRepository: PodcastEpisodeRepository,
    private queryBuilder: QueryBuilder,
  ) {}

  async findLastPublished(): Promise<Nullable<PodcastEpisode>> {
    try {
      const dayInMilliseconds = 1000 * 60 * 60 * 24;
      const podcasts = await this.filter({
        // greater than last week minus a day
        pubDate_gte: new Date(new Date().getTime() - 20 * dayInMilliseconds),
      });

      const sortedByPubDate = podcasts.sort((a, b) => {
        const ifAfter = a.pubDate.ifAfter(b.pubDate.value);
        return ifAfter ? -1 : 1;
      });

      return sortedByPubDate[0];
    } catch (error) {
      throw new NotFoundEpisodeException();
    }
  }

  public async filter(
    query: PodcastEpisodeQuery,
    paginator: Paginator<PodcastEpisodeDTO> = {},
  ): Promise<PodcastEpisode[]> {
    const queryBuilt = this.queryBuilder.build(query);

    return await this.podcastEpisodeRepository.filter(queryBuilt, paginator);
  }

  public async findByArray(uuids: string[]): Promise<PodcastEpisode[]> {
    return this.podcastEpisodeRepository.findByArray(uuids);
  }
}
