import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';

import { Nullable } from 'src/helpers/types/Nullable.type';

import { NotFoundPlaylistException } from '../../domain/exceptions/NotFoundPlaylist.exception';
import { PlaylistRepository } from '../../domain/interfaces/PlaylistRepository.interface';
import { Playlist, PlaylistDTO } from '../../domain/Playlist.model';
import { MongoPlaylistDocument, PLAYLIST_NAME } from './MongoPlaylistSchema';

@Injectable()
export class MongoPlaylistRepository implements PlaylistRepository {
  constructor(
    @InjectModel(PLAYLIST_NAME)
    private MongoPlaylistSchema: Model<MongoPlaylistDocument>,
  ) {}

  public async save(playlist: Playlist): Promise<void> {
    try {
      const mongoObjet = new this.MongoPlaylistSchema(playlist.toDTO());
      await mongoObjet.save();
    } catch (error) {
      throw new Error('Error saving playlist: DB save');
    }
  }

  public async update(playlist: Playlist): Promise<void> {
    try {
      await this.MongoPlaylistSchema.findOneAndUpdate(
        { uuid: playlist.uuid.value },
        playlist.toDTO(),
      );
    } catch (error) {
      throw new Error('Error updating playlist: DB update');
    }
  }

  public async delete(uuid: string): Promise<void> {
    await this.MongoPlaylistSchema.findOneAndDelete({ uuid: uuid });
  }

  public async filter(query: any): Promise<Playlist[]> {
    const playlistsDto: Document<PlaylistDTO>[] =
      await this.MongoPlaylistSchema.find(query);

    return playlistsDto.map(
      (playlistDTO) => new Playlist(playlistDTO.toObject()),
    );
  }

  public async getPlaylist(uuid: string): Promise<Playlist> {
    const playlistDTO: Nullable<Document<PlaylistDTO>> =
      await this.MongoPlaylistSchema.findOne({
        uuid: uuid,
      }).exec();

    if (!playlistDTO) throw new NotFoundPlaylistException('Playlist not found');

    return new Playlist(playlistDTO.toObject());
  }

  public async getPlaylistByOwn(own: string): Promise<Playlist[]> {
    const playlistDTO: PlaylistDTO[] = await this.MongoPlaylistSchema.find({
      own: own,
    });

    return playlistDTO.map((playlistDTO) => new Playlist(playlistDTO));
  }

  public async getChannels(): Promise<Playlist[]> {
    const playlistDTO: PlaylistDTO[] = await this.MongoPlaylistSchema.find({
      own: null,
    });
    return playlistDTO.map((playlistDTO) => new Playlist(playlistDTO));
  }
}
