import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JWTGuard } from 'src/Auth/infrastructure/JWT.guard';
import { DeepOptional } from 'src/helpers/types/DeepOptional';
import { FormDataParser } from 'src/Shared/domain/interfaces/FormDataParser.interface';
import { User } from 'src/User/domain/User.mode';
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
  @UseGuards(JWTGuard)
  public async updatePlaylist(
    @Param('uuid') uuid: string,
    @Req() req: any,
  ): Promise<void> {
    const user: User = req.body?.session?.user;

    const { fields, files } = await this.formDataParser.parse<
      DeepOptional<PlaylistDTO>
    >(req);

    await this.playlistUpdater.update({ ...fields, uuid }, user, files[0]);
  }

  @Post('/:uuid/episode/add')
  @UseGuards(JWTGuard)
  public async addEpisode(
    @Param('uuid') playlistUuid: string,
    @Body() body: { episodeUuid: string; session: { user: User } },
  ): Promise<void> {
    const user: User = body?.session?.user;
    const { episodeUuid } = body;
    await this.playlistEpisodeUpdater.addEpisode(
      playlistUuid,
      episodeUuid,
      user,
    );
  }

  @Post('/:uuid/episode/remove')
  @UseGuards(JWTGuard)
  public async removeEpisode(
    @Param('uuid') playlistUuid: string,
    @Body() body: { episodeUuid: string; session: { user: User } },
  ): Promise<void> {
    const user: User = body?.session?.user;

    const { episodeUuid } = body;
    await this.playlistEpisodeUpdater.removeEpisode(
      playlistUuid,
      episodeUuid,
      user,
    );
  }
}
