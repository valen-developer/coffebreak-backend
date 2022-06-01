import { MongoImageRepository } from "../../../../context/PodcastApp/Image/infrastructure/MongoImageRepository/MongoImageRepository";
import { MongoPlaylistRepository } from "../../../../context/PodcastApp/Playlist/infrastructure/MongoPlaylistRepository/MongoPlaylistRepository";
import { MongoPodcastEpisodeRepository } from "../../../../context/PodcastApp/Podcast/infrastructure/MongoPodcastEpisodeRepository";
import { MongoUserRepository } from "../../../../context/PodcastApp/User/infrastructure/MongoUserRepository/MongoUserRepository";
import { Container } from "./Container";

export enum Repositories {
  PodcastEpisodeRepository = "PodcastEpisodeRepository",
  PlaylistRepository = "PlaylistRepository",
  ImageRepository = "ImageRepository",
  UserRepository = "UserRepository",
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

  container.register(
    Repositories.ImageRepository,
    () => new MongoImageRepository()
  );

  container.register(
    Repositories.UserRepository,
    () => new MongoUserRepository()
  );
};
