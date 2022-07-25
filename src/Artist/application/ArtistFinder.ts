import { Injectable } from '@nestjs/common';
import { asyncMap } from 'src/helpers/functions/asyncMap.function';
import { Paginated } from 'src/helpers/types/Paginated';
import { Union } from 'src/helpers/types/Union.type';
import { PAGE_SIZE } from 'src/Shared/constansts/PageSize.constant';
import { Paginator } from 'src/Shared/domain/interfaces/Paginator.interface';
import { PodcastEpisodeFinder } from '../../Podcast/application/PodcastEpisodeFinder';
import { PodcastEpisode } from '../../Podcast/domain/PodcastEpisode.model';
import { QueryBuilder } from '../../Shared/domain/interfaces/QueryBuilder.interface';
import { Artist, ArtistDTO } from '../domain/Artist.model';
import { ArtistQuery } from '../domain/ArtistQuery';
import { ArtistRepository } from '../domain/interfaces/ArtistRepository.interface';

@Injectable()
export class ArtistFinder {
  constructor(
    private artistRepository: ArtistRepository,
    private queryBuilder: QueryBuilder,
    private episodeFinder: PodcastEpisodeFinder,
  ) {}

  public async findAll(): Promise<Artist[]> {
    return this.artistRepository.findAll();
  }

  public async find(uuid: string): Promise<Artist> {
    return this.artistRepository.find(uuid);
  }

  public async filter(
    query: Union<ArtistQuery, Paginator<ArtistDTO>>,
  ): Promise<Paginated<ArtistDTO[], 'artists'>> {
    const paginatorFixed: Paginator<ArtistDTO> = {
      page: query?.page ?? 1,
      sort_by: query?.sort_by ?? 'name',
      order: query?.order ?? 'asc',
    };

    const artists = await this.artistRepository.filter(
      this.queryBuilder.build(query),
      paginatorFixed,
    );

    const count = await this.artistRepository.count(
      this.queryBuilder.build(query),
    );
    const pages = Math.ceil(count / PAGE_SIZE);

    return {
      artists: artists.map((artist) => artist.toDto()),
      pages,
    };
  }

  public async findEpisodes(artistUuid: string): Promise<PodcastEpisode[]> {
    const artist = await this.artistRepository.find(artistUuid);
    const episodes = await asyncMap(
      artist.getEpisodes(),
      async (ep) => await this.episodeFinder.filter({ episode_equals: ep }),
    ).then((arr) => arr.flat());

    return episodes;
  }
}
