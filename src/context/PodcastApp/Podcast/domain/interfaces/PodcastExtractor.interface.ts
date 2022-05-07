import { HttpClient } from "../../../Shared/domain/interfaces/HttpClient.interface";

export abstract class PodcastExtractor {
  abstract extract(httpClient: HttpClient, fromDate?: Date): Promise<any[]>;
}
