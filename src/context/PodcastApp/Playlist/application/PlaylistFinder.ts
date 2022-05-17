import { PodcastEpisodeFinder } from "../../Podcast/application/PodcastEpisodeFinder";
import { PodcastEpisode } from "../../Podcast/domain/PodcastEpisode.model";
import { NotFoundPlaylistException } from "../domain/exceptions/NotFoundPlaylist.exception";
import { PlaylistRepository } from "../domain/interfaces/PlaylistRepository.interface";
import { Playlist } from "../domain/Playlist.model";

export class PlaylistFinder {
  constructor(
    private playlistRepository: PlaylistRepository,
    private episodeFinder: PodcastEpisodeFinder
  ) {}

  public async getPlaylist(uuid: string): Promise<Playlist> {
    const playlist = await this.playlistRepository.getPlaylist(uuid);

    if (!playlist) throw new NotFoundPlaylistException("Playlist not found");

    return playlist;
  }

  public getyByOwn(own: string): Promise<Playlist[]> {
    return this.playlistRepository.getPlaylistByOwn(own);
  }

  public getChannels(): Promise<Playlist[]> {
    return this.playlistRepository.getChannels();
  }

  public async getEpisodes(playlistUuid: string): Promise<PodcastEpisode[]> {
    const playlist = await this.playlistRepository.getPlaylist(playlistUuid);
    const episodes = await this.episodeFinder.findByArray(
      playlist.getEpisodes().value
    );

    return episodes;
  }
}
