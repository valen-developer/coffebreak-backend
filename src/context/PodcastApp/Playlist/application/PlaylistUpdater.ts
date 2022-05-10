import { PlaylistRepository } from "../domain/interfaces/PlaylistRepository.interface";
import { Playlist } from "../domain/Playlist.model";

export class PlaylistUpdater {
  constructor(private playlistRepository: PlaylistRepository) {}

  public async update(playlist: Playlist): Promise<void> {
    return this.playlistRepository.update(playlist);
  }
}
