import { Controller, Delete, Param } from '@nestjs/common';
import { PlaylistDeleter } from './application/PlaylistDeleter';

@Controller('playlist')
export class ProtectedPlaylistDeleteController {
  constructor(private playlistDeleter: PlaylistDeleter) {}

  @Delete(':uuid')
  public async deletePlaylist(@Param('uuid') uuid: string): Promise<void> {
    await this.playlistDeleter.delete(uuid);
  }
}
