import { HttpClient } from "../../../Shared/domain/interfaces/HttpClient.interface";
import { UUIDGenerator } from "../../../Shared/domain/interfaces/UuidGenerator";
import { PodcastEpisode } from "../PodcastEpisode.model";

export abstract class PodcastExtractor {
  abstract extract(
    httpClient: HttpClient,
    uuidGenerator: UUIDGenerator,
    fromDate?: Date
  ): Promise<PodcastEpisode[]>;
}
