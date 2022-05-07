import { CronJob } from "../../Shared/domain/interfaces/Cronjob.interface";
import { HttpClient } from "../../Shared/domain/interfaces/HttpClient.interface";
import { PodcastEpisodeRepository } from "../domain/interfaces/PodcastEpisodeRepository.interface";
import { PodcastExtractor } from "../domain/interfaces/PodcastExtractor.interface";

export class PodcastExtractorCrontab {
  constructor(
    private httpClient: HttpClient,
    private cron: CronJob,
    private podcastExtractor: PodcastExtractor,
    private podcastEpisodeRepository: PodcastEpisodeRepository
  ) {}

  public async run(): Promise<void> {
    // exectcute extract all thursday at 19h CEST
    this.cron.schedule("0 19 * * THU", () => this.extract());
    this.cron.start();
  }

  public async extract(): Promise<void> {
    const lastEpisode = await this.podcastEpisodeRepository.findLastPublished();
    this.podcastExtractor.extract(this.httpClient, lastEpisode?.pubDate.value);
  }
}
