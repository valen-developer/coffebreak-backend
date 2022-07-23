import { PlaylistFinder } from "./PlaylistFinder";
import { PlaylistUpdater } from "./PlaylistUpdater";

export class PlaylistEpisodeUpdater {
  constructor(
    private playlistFinder: PlaylistFinder,
    private playlistUpdater: PlaylistUpdater
  ) {}

  public async addEpisode(
    playlistUuid: string,
    episodeUuid: string
  ): Promise<void> {
    const playlist = await this.playlistFinder.getPlaylist(playlistUuid);
    playlist.addEpisode(episodeUuid);

    await this.playlistUpdater.update(playlist);
  }

  public async removeEpisode(
    playlistUuid: string,
    episodeUuid: string
  ): Promise<void> {
    const playlist = await this.playlistFinder.getPlaylist(playlistUuid);
    playlist.removeEpisode(episodeUuid);

    await this.playlistUpdater.update(playlist);
  }
}
