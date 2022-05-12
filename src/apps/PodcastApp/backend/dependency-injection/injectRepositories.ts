import { MongoPlaylistRepository } from "../../../../context/PodcastApp/Playlist/infrastructure/MongoPlaylistRepository/MongoPlaylistRepository";
import { MongoPodcastEpisodeRepository } from "../../../../context/PodcastApp/Podcast/infrastructure/MongoPodcastEpisodeRepository";
import { Container } from "./Container";

export enum Repositories {
  PodcastEpisodeRepository = "PodcastEpisodeRepository",
  PlaylistRepository = "PlaylistRepository",
}

export const injectRepositories = () => {
  const container = Container.getInstance();

  container.register(
    Repositories.PodcastEpisodeRepository,
    () => new MongoPodcastEpisodeRepository()
  );

  container.register(
    Repositories.PlaylistRepository,
    () => new MongoPlaylistRepository()
  );
};
