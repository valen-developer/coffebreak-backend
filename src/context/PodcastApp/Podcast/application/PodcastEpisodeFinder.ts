import { PodcastEpisodeRepository } from "../domain/interfaces/PodcastEpisodeRepository.interface";
import { PodcastEpisode } from "../domain/PodcastEpisode.model";

export class PodcastEpisodeFinder {
  constructor(private podcastEpisodeRepository: PodcastEpisodeRepository) {}

  async findLastPublished(): Promise<PodcastEpisode> {
    return this.podcastEpisodeRepository.findLastPublished();
  }
}
