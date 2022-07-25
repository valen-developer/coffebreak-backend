import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { JWTGuard } from 'src/Auth/infrastructure/JWT.guard';
import { PlaylistDeleter } from './application/PlaylistDeleter';

@Controller('playlist')
export class ProtectedPlaylistDeleteController {
  constructor(private playlistDeleter: PlaylistDeleter) {}

  @Delete(':uuid')
  @UseGuards(JWTGuard)
  public async deletePlaylist(@Param('uuid') uuid: string): Promise<void> {
    await this.playlistDeleter.delete(uuid);
  }
}
