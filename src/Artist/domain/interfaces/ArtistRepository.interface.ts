import { Artist } from "../Artist.model";
import { ArtistQuery } from "../ArtistQuery";

export abstract class ArtistRepository {
  abstract save(artist: Artist): Promise<Artist>;
  abstract find(uuid: string): Promise<Artist>;
  abstract findAll(): Promise<Artist[]>;
  abstract filter(query: any): Promise<Artist[]>;
  abstract update(artist: Artist): Promise<Artist>;
}
