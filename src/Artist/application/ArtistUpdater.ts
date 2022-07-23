import { Injectable } from '@nestjs/common';
import { Artist } from '../domain/Artist.model';
import { ArtistRepository } from '../domain/interfaces/ArtistRepository.interface';

@Injectable()
export class ArtistUpdater {
  constructor(private artistRepository: ArtistRepository) {}

  public async update(artist: Artist): Promise<Artist> {
    return this.artistRepository.update(artist);
  }
}
