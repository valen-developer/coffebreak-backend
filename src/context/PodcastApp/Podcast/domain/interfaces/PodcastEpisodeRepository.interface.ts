import { PodcastEpisode } from "../PodcastEpisode.model";

export abstract class PodcastEpisodeRepository {
  abstract filter(query: any): Promise<PodcastEpisode[]>;
  abstract findLastPublished(): Promise<PodcastEpisode>;
}
