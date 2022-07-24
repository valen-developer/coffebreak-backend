import { Injectable } from '@nestjs/common';
import { InvalidException } from 'src/Shared/domain/exceptions/Invalid.exception';
import { PlaylistFinder } from './PlaylistFinder';
import { PlaylistUpdater } from './PlaylistUpdater';

@Injectable()
export class PlaylistEpisodeUpdater {
  constructor(
    private playlistFinder: PlaylistFinder,
    private playlistUpdater: PlaylistUpdater,
  ) {}

  public async addEpisode(
    playlistUuid: string,
    episodeUuid: string,
  ): Promise<void> {
    if (!episodeUuid) throw new InvalidException('episodeUuid is required');

    const playlist = await this.playlistFinder.getPlaylist(playlistUuid);
    playlist.addEpisode(episodeUuid);

    await this.playlistUpdater.update(playlist.toDTO());
  }

  public async removeEpisode(
    playlistUuid: string,
    episodeUuid: string,
  ): Promise<void> {
    if (!episodeUuid) throw new InvalidException('episodeUuid is required');

    const playlist = await this.playlistFinder.getPlaylist(playlistUuid);

    playlist.removeEpisode(episodeUuid);

    await this.playlistUpdater.update(playlist.toDTO());
  }
}
