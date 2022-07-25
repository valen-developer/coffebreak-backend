import { Injectable } from '@nestjs/common';
import { ImageDeleter } from '../../Image/application/ImageDeleter';
import { PlaylistRepository } from '../domain/interfaces/PlaylistRepository.interface';

@Injectable()
export class PlaylistDeleter {
  constructor(
    private playlistRepository: PlaylistRepository,
    private imageDeleter: ImageDeleter,
  ) {}

  public async delete(uuid: string): Promise<void> {
    //TODO: check if user is owner of playlist
    await this.playlistRepository.delete(uuid);
    await this.imageDeleter.deleteByEntityUuid(uuid);
  }
}
