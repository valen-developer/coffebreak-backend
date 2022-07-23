import { ImageDeleter } from "../../Image/application/ImageDeleter";
import { PlaylistRepository } from "../domain/interfaces/PlaylistRepository.interface";

export class PlaylistDeleter {
  constructor(
    private playlistRepository: PlaylistRepository,
    private imageDeleter: ImageDeleter
  ) {}

  public async delete(uuid: string): Promise<void> {
    await this.playlistRepository.delete(uuid);
    await this.imageDeleter.deleteByEntityUuid(uuid);
  }
}
