import { Injectable } from '@nestjs/common';
import { PodcastEpisodeFinder } from '../../Podcast/application/PodcastEpisodeFinder';
import { PodcastEpisodeQuery } from '../../Podcast/domain/PodcastEpisodeQuery';
import { Events } from '../../Shared/domain/constants/Events';
import { EventEmitter } from '../../Shared/domain/interfaces/EventEmitter';
import { FileData } from '../../Shared/domain/interfaces/FormDataParser.interface';
import { UUIDGenerator } from '../../Shared/domain/interfaces/UuidGenerator';
import { Playlist } from '../domain/Playlist.model';
import { PlaylistCreator } from './PlaylistCreator';

@Injectable()
export class PlaylistTematicCreator {
  constructor(
    private episodeFinder: PodcastEpisodeFinder,
    private playlistCreator: PlaylistCreator,
    private uuidGenerator: UUIDGenerator,
    private eventEmitter: EventEmitter,
  ) {}

  public async create(params: TematicPlaylistCreatorParams): Promise<void> {
    const { tematic, fileData, description, name } = params;

    const query: PodcastEpisodeQuery = {
      title_contains: tematic,
    };

    const episodes = await this.episodeFinder.filter(query, {});

    const playlist = new Playlist({
      uuid: this.uuidGenerator.generate(),
      name,
      description,
      own: null,
      episodes: episodes.map((episode) => episode.uuid.value),
    });

    await this.playlistCreator.fromEntity(playlist, fileData);
    this.eventEmitter.emit(Events.NEW_CHANNEL, playlist);
  }
}

export interface TematicPlaylistCreatorParams {
  tematic: string;
  name: string;
  description: string;
  fileData: FileData;
}
