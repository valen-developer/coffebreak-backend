import { asyncMap } from 'src/helpers/functions/asyncMap.function';
import { PodcastEpisodeFinder } from '../../Podcast/application/PodcastEpisodeFinder';
import { PodcastEpisode } from '../../Podcast/domain/PodcastEpisode.model';
import { QueryBuilder } from '../../Shared/domain/interfaces/QueryBuilder.interface';
import { Artist } from '../domain/Artist.model';
import { ArtistQuery } from '../domain/ArtistQuery';
import { ArtistRepository } from '../domain/interfaces/ArtistRepository.interface';

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

  public async filter(query: ArtistQuery): Promise<Artist[]> {
    return this.artistRepository.filter(this.queryBuilder.build(query));
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
