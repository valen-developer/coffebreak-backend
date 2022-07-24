import { Controller, Get, Param, Req } from '@nestjs/common';
import { PodcastEpisodeDTO } from 'src/Podcast/domain/PodcastEpisode.model';
import { User } from 'src/User/domain/User.mode';
import { PlaylistFinder } from './application/PlaylistFinder';
import { PlaylistDTO } from './domain/Playlist.model';

@Controller('playlist')
export class PlaylistFinderController {
  constructor(private playlistFinder: PlaylistFinder) {}

  @Get('channels')
  public async getChannels(): Promise<PlaylistDTO[]> {
    const playlists = await this.playlistFinder.getChannels();

    return playlists.map((playlist) => playlist.toDTO());
  }

  @Get(':uuid/episodes')
  public async getEpisodes(
    @Param('uuid') uuid: string,
  ): Promise<PodcastEpisodeDTO[]> {
    const playlists = await this.playlistFinder.getEpisodes(uuid);

    return playlists.map((playlist) => playlist.toDTO());
  }

  @Get(':uuid')
  public async getPlaylist(@Param('uuid') uuid: string): Promise<PlaylistDTO> {
    const playlist = await this.playlistFinder.getPlaylist(uuid);

    return playlist.toDTO();
  }
}
