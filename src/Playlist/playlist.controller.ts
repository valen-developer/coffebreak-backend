import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JWTGuard } from 'src/Auth/infrastructure/JWT.guard';
import { DeepOptional } from 'src/helpers/types/DeepOptional';
import { PodcastEpisodeDTO } from 'src/Podcast/domain/PodcastEpisode.model';
import { FormDataParser } from 'src/Shared/domain/interfaces/FormDataParser.interface';
import { User } from 'src/User/domain/User.mode';
import {
  CreatePlaylistParams,
  PlaylistCreator,
} from './application/PlaylistCreator';
import { PlaylistDeleter } from './application/PlaylistDeleter';
import { PlaylistDuplicator } from './application/PlaylistDuplicator';
import { PlaylistEpisodeUpdater } from './application/PlaylistEpisodeUpdater';
import { PlaylistFinder } from './application/PlaylistFinder';
import {
  PlaylistTematicCreator,
  TematicPlaylistCreatorParams,
} from './application/PlaylistTematicCreator';
import { PlaylistUpdater } from './application/PlaylistUpdater';
import { PlaylistDTO } from './domain/Playlist.model';
import { PlaylistQuery } from './domain/PlaylistQuery';

@Controller('playlist')
export class PlaylistController {
  constructor(
    private formDataParser: FormDataParser,
    private playlistCreator: PlaylistCreator,
    private playlistDuplicator: PlaylistDuplicator,
    private tematicPlaylistCreator: PlaylistTematicCreator,
    private playlistFinder: PlaylistFinder,
    private playlistDeleter: PlaylistDeleter,
    private playlistUpdater: PlaylistUpdater,
    private playlistEpisodeUpdater: PlaylistEpisodeUpdater,
  ) {}

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

  @Get('own')
  @UseGuards(JWTGuard)
  public async getPlaylistByOwner(@Req() request: any): Promise<PlaylistDTO[]> {
    const user: User = request?.body?.session?.user;
    const playlists = await this.playlistFinder.getyByOwn(user.uuid.value);

    return playlists.map((playlist) => playlist.toDTO());
  }

  @Post('search')
  @UseGuards(JWTGuard)
  public async searchPlaylists(
    @Req() request: any,
    @Body() queryBody: PlaylistQuery,
  ): Promise<PlaylistDTO[]> {
    const user: User = request.body?.session?.user;

    const query: PlaylistQuery = {
      ...queryBody,
      own_equal: user.uuid.value,
    };

    const playlists = await this.playlistFinder.filter(query);

    return playlists.map((playlist) => playlist.toDTO());
  }

  @Post()
  @UseGuards(JWTGuard)
  public async createPlaylist(@Req() req: Request): Promise<PlaylistDTO> {
    const user = req.body.session?.user;

    if (!user) throw new UnauthorizedException();

    const { fields, files } =
      await this.formDataParser.parse<CreatePlaylistParams>(req);

    const newPlaylist = await this.playlistCreator.create({
      ...fields,
      own: user.uuid.value,
      fileData: files[0],
    });

    return newPlaylist.toDTO();
  }

  @Post('tematic')
  @UseGuards(JWTGuard)
  public async createTematicPlaylist(@Req() request: any): Promise<void> {
    const { fields, files } =
      await this.formDataParser.parse<TematicPlaylistCreatorParams>(request);

    await this.tematicPlaylistCreator.create({
      ...fields,
      fileData: files[0],
    });
  }

  @Post('duplicate/:uuid')
  @UseGuards(JWTGuard)
  public async duplicatePlaylist(
    @Param('uuid') uuid: string,
    @Req() req: any,
  ): Promise<PlaylistDTO> {
    const { session } = req.body;
    const { user } = session;

    const playlist = await this.playlistDuplicator.duplicate(
      uuid,
      user.uuid.value,
    );
    return playlist.toDTO();
  }

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

  @Delete(':uuid')
  @UseGuards(JWTGuard)
  public async deletePlaylist(@Param('uuid') uuid: string): Promise<void> {
    await this.playlistDeleter.delete(uuid);
  }
}
