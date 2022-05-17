import { NotFoundPlaylistException } from "../../domain/exceptions/NotFoundPlaylist.exception";
import { PlaylistRepository } from "../../domain/interfaces/PlaylistRepository.interface";
import { Playlist, PlaylistDTO } from "../../domain/Playlist.model";
import { MongoPlaylistSchema } from "./MongoPlaylistSchema";

export class MongoPlaylistRepository implements PlaylistRepository {
  public async save(playlist: Playlist): Promise<void> {
    try {
      const mongoObjet = new MongoPlaylistSchema(playlist.toDTO());
      await mongoObjet.save();
    } catch (error) {
      throw new Error("Error saving playlist: DB save");
    }
  }

  public async update(playlist: Playlist): Promise<void> {
    try {
      await MongoPlaylistSchema.findOneAndUpdate(
        { uuid: playlist.uuid.value },
        playlist.toDTO()
      );
    } catch (error) {
      throw new Error("Error updating playlist: DB update");
    }
  }

  public async delete(uuid: string): Promise<void> {
    await MongoPlaylistSchema.findOneAndDelete({ uuid: uuid });
  }

  public async getPlaylist(uuid: string): Promise<Playlist> {
    const playlistDTO: PlaylistDTO = await MongoPlaylistSchema.findOne({
      uuid: uuid,
    });

    if (!playlistDTO) throw new NotFoundPlaylistException("Playlist not found");

    return new Playlist(playlistDTO);
  }

  public async getPlaylistByOwn(own: string): Promise<Playlist[]> {
    const playlistDTO: PlaylistDTO[] = await MongoPlaylistSchema.find({
      own: own,
    });

    return playlistDTO.map((playlistDTO) => new Playlist(playlistDTO));
  }

  public async getChannels(): Promise<Playlist[]> {
    const playlistDTO: PlaylistDTO[] = await MongoPlaylistSchema.find({
      own: null,
    });
    return playlistDTO.map((playlistDTO) => new Playlist(playlistDTO));
  }
}
