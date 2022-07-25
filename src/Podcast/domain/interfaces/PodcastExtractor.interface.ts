import { HttpClient } from '../../../Shared/domain/interfaces/HttpClient.interface';
import { UUIDGenerator } from '../../../Shared/domain/interfaces/UuidGenerator';
import { PodcastEpisode } from '../PodcastEpisode.model';

export abstract class PodcastExtractor {
  abstract extract(
    httpClient: HttpClient,
    uuidGenerator: UUIDGenerator,
    fromDate?: Date,
  ): Promise<PodcastEpisode[]>;

  /**
   *
   * @param description episode description
   * @returns {
   * time: string (hh:mm:ss format)
   * trackName: string (track description)
   * }
   */
  abstract extractTracks(
    description: string,
  ): { time: string; trackName: string }[];
}
