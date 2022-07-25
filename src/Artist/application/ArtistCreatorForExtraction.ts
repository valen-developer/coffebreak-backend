import { Injectable } from '@nestjs/common';
import { QueryBuilder } from '../../Shared/domain/interfaces/QueryBuilder.interface';
import { UUIDGenerator } from '../../Shared/domain/interfaces/UuidGenerator';
import { Artist } from '../domain/Artist.model';
import { ArtistQuery } from '../domain/ArtistQuery';
import { ArtistRepository } from '../domain/interfaces/ArtistRepository.interface';

@Injectable()
export class ArtistCreatorForExtraction {
  constructor(
    private artistRepository: ArtistRepository,
    private queryBuilder: QueryBuilder,
    private uuidGenerator: UUIDGenerator,
  ) {}

  public async create(name: string): Promise<Artist> {
    const query: ArtistQuery = {
      name_contains: name,
    };
    // check if exist by name
    const artists = await this.artistRepository.filter(
      this.queryBuilder.build(query),
      {
        sort_by: 'name',
      },
    );
    const hasArtist = artists.length > 0;

    if (hasArtist) return artists[0];

    // create new artist
    const artist = new Artist({
      uuid: this.uuidGenerator.generate(),
      name: name,
    });
    await this.artistRepository.save(artist);

    return artist;
  }

  public async update(artist: Artist): Promise<Artist> {
    return this.artistRepository.update(artist);
  }
}
