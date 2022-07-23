import { Injectable } from '@nestjs/common';
import { Artist, ArtistDTO } from '../domain/Artist.model';
import { ArtistRepository } from '../domain/interfaces/ArtistRepository.interface';

@Injectable()
export class ArtistCreator {
  constructor(private artistRepository: ArtistRepository) {}

  public async create(dto: ArtistDTO): Promise<Artist> {
    const artist = new Artist(dto);
    return this.artistRepository.save(artist);
  }
}
