import { Body, Controller, Param, Post, Put, Req } from '@nestjs/common';
import { DeepOptional } from 'src/helpers/types/DeepOptional';
import { FormDataParser } from 'src/Shared/domain/interfaces/FormDataParser.interface';
import { PlaylistEpisodeUpdater } from './application/PlaylistEpisodeUpdater';
import { PlaylistUpdater } from './application/PlaylistUpdater';
import { PlaylistDTO } from './domain/Playlist.model';

@Controller('playlist')
export class ProtectedPlaylistUpdaterController {
  constructor(
    private formDataParser: FormDataParser,
    private playlistUpdater: PlaylistUpdater,
    private playlistEpisodeUpdater: PlaylistEpisodeUpdater,
  ) {}

  @Put(':uuid')
  public async updatePlaylist(
    @Param('uuid') uuid: string,
    @Req() req: any,
  ): Promise<void> {
    const { fields, files } = await this.formDataParser.parse<
      DeepOptional<PlaylistDTO>
    >(req);

    await this.playlistUpdater.update({ ...fields, uuid }, files[0]);
  }

  @Post('/:uuid/episode/add')
  public async addEpisode(
    @Param('uuid') playlistUuid: string,
    @Body() body: { episodeUuid: string },
  ): Promise<void> {
    const { episodeUuid } = body;
    await this.playlistEpisodeUpdater.addEpisode(playlistUuid, episodeUuid);
  }

  @Post('/:uuid/episode/remove')
  public async removeEpisode(
    @Param('uuid') playlistUuid: string,
    @Body() body: { episodeUuid: string },
  ): Promise<void> {
    const { episodeUuid } = body;
    await this.playlistEpisodeUpdater.removeEpisode(playlistUuid, episodeUuid);
  }
}
