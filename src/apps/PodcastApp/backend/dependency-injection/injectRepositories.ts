import { PodcastEpisodeRepository } from "../../../../context/PodcastApp/Podcast/domain/interfaces/PodcastEpisodeRepository.interface";
import { Container } from "./Container";

export enum Repositories {
  PodcastEpisodeRepository = "PodcastEpisodeRepository",
}

export const injectRepositories = () => {
  const container = Container.getInstance();
};
