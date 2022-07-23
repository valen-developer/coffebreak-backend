import { ImageUpdater } from '../../Image/application/ImageUpdater';
import { FileUploader } from '../../Shared/domain/interfaces/FileUploader';
import { FileData } from '../../Shared/domain/interfaces/FormDataParser.interface';
import { UUIDGenerator } from '../../Shared/domain/interfaces/UuidGenerator';
import { PlaylistRepository } from '../domain/interfaces/PlaylistRepository.interface';
import { Playlist } from '../domain/Playlist.model';

export class PlaylistUpdater {
  constructor(
    private playlistRepository: PlaylistRepository,
    private uuidGenerator: UUIDGenerator,
    private fileUploader: FileUploader,
    private imageUpdater: ImageUpdater,
  ) {}

  public async update(playlist: Playlist, image?: FileData): Promise<void> {
    await this.playlistRepository.update(playlist);
    if (image) await this.updateImage(image, playlist.uuid.value);
  }

  private async updateImage(fileData: FileData, uuid: string): Promise<void> {
    const imageUuid = this.uuidGenerator.generate();
    const file: FileData = {
      ...fileData,
      name: imageUuid,
    };

    const imagePath = await this.fileUploader.uploadImage(file);

    await this.imageUpdater.replaceForEntity(uuid, imagePath, imageUuid);
  }
}
