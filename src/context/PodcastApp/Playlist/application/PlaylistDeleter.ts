import { PlaylistRepository } from "../domain/interfaces/PlaylistRepository.interface";

export class PlaylistDeleter {
  constructor(private playlistRepository: PlaylistRepository) {}

  public async delete(uuid: string): Promise<void> {
    return this.playlistRepository.delete(uuid);
  }
}
