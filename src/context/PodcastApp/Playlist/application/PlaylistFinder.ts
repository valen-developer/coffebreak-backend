import { PlaylistRepository } from "../domain/interfaces/PlaylistRepository.interface";
import { Playlist } from "../domain/Playlist.model";

export class PlaylistFinder {
  constructor(private playlistRepository: PlaylistRepository) {}

  public async getPlaylist(uuid: string): Promise<Playlist> {
    return this.playlistRepository.getPlaylist(uuid);
  }

  public getyByOwn(own: string): Promise<Playlist[]> {
    return this.playlistRepository.getPlaylistByOwn(own);
  }

  public getChannels(): Promise<Playlist[]> {
    return this.playlistRepository.getChannels();
  }
}
