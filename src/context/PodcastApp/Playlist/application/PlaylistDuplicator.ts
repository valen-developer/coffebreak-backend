import { ImageFinder } from "../../Image/application/ImageFinder";
import { ImageRepository } from "../../Image/domain/interfaces/ImageRepository.interface";
import { UUIDGenerator } from "../../Shared/domain/interfaces/UuidGenerator";
import { PlaylistRepository } from "../domain/interfaces/PlaylistRepository.interface";
import { Playlist } from "../domain/Playlist.model";

export class PlaylistDuplicator {
  constructor(
    private playlistRepository: PlaylistRepository,
    private imageFinder: ImageFinder,
    private uuidGenerator: UUIDGenerator
  ) {}

  public async duplicate(
    playlistUuid: string,
    ownUuid?: string
  ): Promise<Playlist> {
    const playlist = await this.playlistRepository.getPlaylist(playlistUuid);
    const image = await this.imageFinder.findByEntityUuid(playlist.uuid.value);

    const newPlaylist = new Playlist({
      uuid: this.uuidGenerator.generate(),
      name: playlist.name.value,
      description: playlist.description.value,
      episodes: playlist.getEpisodes().value,
      own: ownUuid,
    });

    await this.playlistRepository.save(newPlaylist);

    return newPlaylist;
  }
}
