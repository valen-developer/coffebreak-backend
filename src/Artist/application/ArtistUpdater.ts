import { Artist } from "../domain/Artist.model";
import { ArtistRepository } from "../domain/interfaces/ArtistRepository.interface";

export class ArtistUpdater {
  constructor(private artistRepository: ArtistRepository) {}

  public async update(artist: Artist): Promise<Artist> {
    return this.artistRepository.update(artist);
  }
}
