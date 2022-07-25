import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JWTGuard } from 'src/Auth/infrastructure/JWT.guard';
import { User } from 'src/User/domain/User.mode';
import { PlaylistFinder } from './application/PlaylistFinder';
import { PlaylistDTO } from './domain/Playlist.model';
import { PlaylistQuery } from './domain/PlaylistQuery';

@Controller('playlist')
export class ProtectedPlaylistFinderController {
  constructor(private playlistFinder: PlaylistFinder) {}

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
}
