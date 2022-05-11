import { Nullable } from "../../../../helpers/types/Nullable.type";
import { Paginator } from "../../Shared/domain/interfaces/Paginator.interface";
import { QueryBuilder } from "../../Shared/domain/interfaces/QueryBuilder.interface";
import { PodcastEpisodeRepository } from "../domain/interfaces/PodcastEpisodeRepository.interface";
import {
  PodcastEpisode,
  PodcastEpisodeDTO,
} from "../domain/PodcastEpisode.model";
import { PodcastEpisodeQuery } from "../domain/PodcastEpisodeQuery";

export class PodcastEpisodeFinder {
  constructor(
    private podcastEpisodeRepository: PodcastEpisodeRepository,
    private queryBuilder: QueryBuilder
  ) {}

  async findLastPublished(): Promise<Nullable<PodcastEpisode>> {
    const podcasts = await this.filter({
      // greater than last week minus a day
      pubDate_gte: new Date(
        new Date().getTime() - 7 * 24 * 60 * 60 * 1000 - 24 * 60 * 60 * 1000
      ),
    });

    const sortedByPubDate = podcasts.sort((a, b) => {
      const ifAfter = a.pubDate.ifAfter(b.pubDate.value);
      return ifAfter ? 1 : -1;
    })[0];

    return sortedByPubDate;
  }

  public async filter(
    query: PodcastEpisodeQuery,
    paginator: Paginator<PodcastEpisodeDTO> = {}
  ): Promise<PodcastEpisode[]> {
    const queryBuilt = this.queryBuilder.build(query);

    return this.podcastEpisodeRepository.filter(queryBuilt, paginator);
  }

  public async findByArray(uuids: string[]): Promise<PodcastEpisode[]> {
    return this.podcastEpisodeRepository.findByArray(uuids);
  }
}
