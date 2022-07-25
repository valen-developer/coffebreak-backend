import { Paginator } from 'src/Shared/domain/interfaces/Paginator.interface';
import { Artist, ArtistDTO } from '../Artist.model';

export abstract class ArtistRepository {
  abstract save(artist: Artist): Promise<Artist>;
  abstract find(uuid: string): Promise<Artist>;
  abstract findAll(): Promise<Artist[]>;
  abstract filter(
    query: any,
    paginator: Paginator<ArtistDTO>,
  ): Promise<Artist[]>;
  abstract count(query: any): Promise<number>;
  abstract update(artist: Artist): Promise<Artist>;
}
