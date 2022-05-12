import { Nullable } from "../../../../helpers/types/Nullable.type";
import { PlaylistRepository } from "../domain/interfaces/PlaylistRepository.interface";
import { Playlist } from "../domain/Playlist.model";

export class PlaylistCreator {
  constructor(private playlistRepository: PlaylistRepository) {}

  public create(
    uuid: string,
    name: string,
    description: string,
    own: Nullable<string>
  ): Promise<void> {
    return this.playlistRepository.save(
      new Playlist({
        uuid,
        name,
        description,
        own,
      })
    );
  }

  public async fromEntity(playlist: Playlist): Promise<void> {
    return this.playlistRepository.save(playlist);
  }
}
