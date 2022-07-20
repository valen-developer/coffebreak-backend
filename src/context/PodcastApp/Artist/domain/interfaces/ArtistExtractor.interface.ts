import { PodcastEpisodeFinder } from "../../../Podcast/application/PodcastEpisodeFinder";
import { Artist } from "../Artist.model";

export abstract class ArtistExtractor {
  constructor(protected episodeFinder: PodcastEpisodeFinder) {}

  abstract extract(): Promise<Artist[]>;
}
