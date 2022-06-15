import { ImageCreator } from "../../Image/application/ImageCreator";
import { PodcastEpisodeFinder } from "../../Podcast/application/PodcastEpisodeFinder";
import { PodcastEpisodeQuery } from "../../Podcast/domain/PodcastEpisodeQuery";
import { Events } from "../../Shared/domain/constants/Events";
import { EventEmitter } from "../../Shared/domain/interfaces/EventEmitter";
import { FileData } from "../../Shared/domain/interfaces/FormDataParser.interface";
import { UUIDGenerator } from "../../Shared/domain/interfaces/UuidGenerator";
import { Playlist } from "../domain/Playlist.model";
import { PlaylistCreator } from "./PlaylistCreator";

export class PlaylistTematicCreator {
  constructor(
    private episodeFinder: PodcastEpisodeFinder,
    private playlistCreator: PlaylistCreator,
    private uuidGenerator: UUIDGenerator,
    private eventEmitter: EventEmitter
  ) {}

  public async create(
    tematic: string,
    playlistName: string,
    playlistDescription: string,
    fileData: FileData
  ): Promise<void> {
    const query: PodcastEpisodeQuery = {
      title_contains: tematic,
    };

    const episodes = await this.episodeFinder.filter(query, {});

    const playlist = new Playlist({
      uuid: this.uuidGenerator.generate(),
      name: playlistName,
      description: playlistDescription,
      own: null,
      episodes: episodes.map((episode) => episode.uuid.value),
    });

    await this.playlistCreator.fromEntity(playlist, fileData);
    this.eventEmitter.emit(Events.NEW_CHANNEL, playlist);
  }
}
