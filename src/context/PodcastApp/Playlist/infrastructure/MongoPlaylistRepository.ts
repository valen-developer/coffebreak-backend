import { PlaylistRepository } from "../domain/interfaces/PlaylistRepository.interface";
import { Playlist } from "../domain/Playlist.model";

export class wMongoPlaylistRepository implements PlaylistRepository {
  public async save(playlist: Playlist): Promise<void> {}
  public update(playlist: Playlist): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public delete(uuid: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public getPlaylist(uuid: string): Promise<Playlist> {
    throw new Error("Method not implemented.");
  }
  public getPlaylistByOwn(own: string): Promise<Playlist[]> {
    throw new Error("Method not implemented.");
  }
  public getChannels(): Promise<Playlist[]> {
    throw new Error("Method not implemented.");
  }
}
