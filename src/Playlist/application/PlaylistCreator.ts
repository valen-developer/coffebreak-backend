import { Injectable } from '@nestjs/common';
import { Nullable } from 'src/helpers/types/Nullable.type';
import { ImageCreator } from '../../Image/application/ImageCreator';
import { FileUploader } from '../../Shared/domain/interfaces/FileUploader';
import { FileData } from '../../Shared/domain/interfaces/FormDataParser.interface';
import { UUIDGenerator } from '../../Shared/domain/interfaces/UuidGenerator';
import { PlaylistRepository } from '../domain/interfaces/PlaylistRepository.interface';
import { Playlist } from '../domain/Playlist.model';

@Injectable()
export class PlaylistCreator {
  constructor(
    private playlistRepository: PlaylistRepository,
    private imageCreator: ImageCreator,
    private fileUploader: FileUploader,
    private uuidGenerator: UUIDGenerator,
  ) {}

  public async create(params: CreatePlaylistParams): Promise<Playlist> {
    const { uuid, name, description, own, fileData } = params;

    const playlist = new Playlist({
      uuid,
      name,
      description,
      own,
    });

    await this.fromEntity(playlist, fileData);

    return playlist;
  }

  public async fromEntity(
    playlist: Playlist,
    fileData: FileData,
  ): Promise<void> {
    const imageUuid = this.uuidGenerator.generate();
    const file: FileData = {
      ...fileData,
      name: imageUuid,
    };

    const imagePath = await this.fileUploader.uploadImage(file);

    const image = await this.imageCreator.create({
      entityUuid: playlist.uuid.value,
      uuid: imageUuid,
      path: imagePath,
    });

    return this.playlistRepository.save(playlist);
  }
}

export interface CreatePlaylistParams {
  uuid: string;
  name: string;
  description: string;
  own: Nullable<string>;
  fileData: FileData;
}
