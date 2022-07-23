import { Playlist } from "../Playlist.model";
import { PlaylistQuery } from "../PlaylistQuery";

export abstract class PlaylistRepository {
  public abstract save(playlist: Playlist): Promise<void>;
  public abstract update(playlist: Playlist): Promise<void>;
  public abstract delete(uuid: string): Promise<void>;

  public abstract getPlaylist(uuid: string): Promise<Playlist>;
  public abstract getPlaylistByOwn(own: string): Promise<Playlist[]>;
  public abstract getChannels(): Promise<Playlist[]>;
  public abstract filter(query: any): Promise<Playlist[]>;
}
