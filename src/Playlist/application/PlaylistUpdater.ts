import { Injectable } from '@nestjs/common';
import { DeepOptional } from 'src/helpers/types/DeepOptional';
import { InvalidException } from 'src/Shared/domain/exceptions/Invalid.exception';
import { User } from 'src/User/domain/User.mode';
import { ImageUpdater } from '../../Image/application/ImageUpdater';
import { FileUploader } from '../../Shared/domain/interfaces/FileUploader';
import { FileData } from '../../Shared/domain/interfaces/FormDataParser.interface';
import { UUIDGenerator } from '../../Shared/domain/interfaces/UuidGenerator';
import { NotFoundPlaylistException } from '../domain/exceptions/NotFoundPlaylist.exception';
import { PlaylistRepository } from '../domain/interfaces/PlaylistRepository.interface';
import { Playlist, PlaylistDTO } from '../domain/Playlist.model';

@Injectable()
export class PlaylistUpdater {
  constructor(
    private playlistRepository: PlaylistRepository,
    private uuidGenerator: UUIDGenerator,
    private fileUploader: FileUploader,
    private imageUpdater: ImageUpdater,
  ) {}

  public async update(
    playlistDto: DeepOptional<PlaylistDTO>,
    owner: User,
    image?: FileData,
  ): Promise<void> {
    if (!playlistDto.uuid)
      throw new InvalidException('Playlist uuid is required');

    const playlist = await this.playlistRepository.getPlaylist(
      playlistDto.uuid,
    );
    if (!playlist) throw new NotFoundPlaylistException('Playlist not found');

    const isOwner = playlist.getOwn().value === owner.uuid.value;
    if (!isOwner)
      throw new InvalidException('You are not the owner of this playlist');

    const updatedPlaylist = new Playlist({
      uuid: playlist.uuid.value,
      description: playlistDto.description ?? playlist.description.value,
      name: playlistDto.name ?? playlist.name.value,
      episodes:
        (playlistDto.episodes as string[]) ?? playlist.getEpisodes().value,
      own: playlist.getOwn().value,
    });

    await this.playlistRepository.update(updatedPlaylist);
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
