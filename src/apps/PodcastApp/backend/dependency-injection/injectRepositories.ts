import { PodcastEpisodeRepository } from "../../../../context/PodcastApp/Podcast/domain/interfaces/PodcastEpisodeRepository.interface";
import { MongoPodcastEpisodeRepository } from "../../../../context/PodcastApp/Podcast/infrastructure/MongoPodcastEpisodeRepository";
import { Container } from "./Container";

export enum Repositories {
  PodcastEpisodeRepository = "PodcastEpisodeRepository",
}

export const injectRepositories = () => {
  const container = Container.getInstance();

  container.register(
    Repositories.PodcastEpisodeRepository,
    () => new MongoPodcastEpisodeRepository()
  );
};
