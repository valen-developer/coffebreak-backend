import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Nullable } from 'src/helpers/types/Nullable.type';
import { Paginated } from 'src/helpers/types/Paginated';
import { PAGE_SIZE } from 'src/Shared/constansts/PageSize.constant';
import { Paginator } from '../../Shared/domain/interfaces/Paginator.interface';
import { PodcastEpisodeRepository } from '../domain/interfaces/PodcastEpisodeRepository.interface';
import {
  PodcastEpisode,
  PodcastEpisodeDTO,
} from '../domain/PodcastEpisode.model';
import {
  EPISODE_NAME,
  MongoEpisodeDocument,
} from './MongoPodcastEpisodeSchema';

@Injectable()
export class MongoPodcastEpisodeRepository implements PodcastEpisodeRepository {
  constructor(
    @InjectModel(EPISODE_NAME)
    private MongoPodcastEpisodeSchema: Model<MongoEpisodeDocument>,
  ) {}

  public async save(episode: PodcastEpisode): Promise<void> {
    await this.MongoPodcastEpisodeSchema.create(episode.toDTO());
  }

  public async filter(
    query: any,
    paginator: Paginator<PodcastEpisodeDTO>,
  ): Promise<PodcastEpisode[]> {
    const { page, sort_by, order } = paginator;
    const pageSize = PAGE_SIZE;
    const skip = page ? (page - 1) * pageSize : 0;
    const limit = page ? pageSize : Infinity;

    const episodesObjects: Nullable<PodcastEpisodeDTO[]> =
      await this.MongoPodcastEpisodeSchema.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ [sort_by ?? 'pubDate']: order ?? 'asc' })
        .then((episodes) => episodes as unknown as PodcastEpisodeDTO[]);

    return (
      episodesObjects?.map(
        (episodeObject) => new PodcastEpisode(episodeObject),
      ) ?? []
    );
  }

  public async paginatedFilter(
    query: any,
    paginator: Paginator<PodcastEpisodeDTO>,
  ): Promise<Paginated<PodcastEpisode[], 'episodes'>> {
    const pageSize = PAGE_SIZE;
    const episodes = await this.filter(query, paginator);
    const count = await this.count(query);

    const pages = Math.ceil(count / pageSize);

    return {
      episodes,
      pages,
    };
  }

  public async count(query: any): Promise<number> {
    return this.MongoPodcastEpisodeSchema.countDocuments(query);
  }

  /* It's finding the last published episode. */
  public async findLastPublished(): Promise<Nullable<PodcastEpisode>> {
    const episodeObject: Nullable<PodcastEpisodeDTO> =
      await this.MongoPodcastEpisodeSchema.findOne({})
        .sort({ pubDate: -1 })
        .then((e) => e as unknown as PodcastEpisodeDTO);

    if (!episodeObject) throw new Error('Not found');

    return new PodcastEpisode(episodeObject);
  }

  public async findByArray(uuids: string[]): Promise<PodcastEpisode[]> {
    // sort by episode.episode
    const episodesObjects: Nullable<PodcastEpisodeDTO[]> =
      await this.MongoPodcastEpisodeSchema.find({
        uuid: { $in: uuids },
      })
        .sort({ episode: 'desc' })
        .then((episodes) => episodes as unknown as PodcastEpisodeDTO[]);

    return (
      episodesObjects?.map(
        (episodeObject) => new PodcastEpisode(episodeObject),
      ) ?? []
    );
  }
}
