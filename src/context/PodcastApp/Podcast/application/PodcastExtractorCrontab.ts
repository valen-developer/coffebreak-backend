import { asyncForeach } from "../../../../helpers/functions/asyncForeach.function";
import { CronJob } from "../../Shared/domain/interfaces/Cronjob.interface";
import { HttpClient } from "../../Shared/domain/interfaces/HttpClient.interface";
import { UUIDGenerator } from "../../Shared/domain/interfaces/UuidGenerator";
import { PodcastEpisodeRepository } from "../domain/interfaces/PodcastEpisodeRepository.interface";
import { PodcastExtractor } from "../domain/interfaces/PodcastExtractor.interface";
import { PodcastEpisodeFinder } from "./PodcastEpisodeFinder";

export class PodcastExtractorCrontab {
  constructor(
    private httpClient: HttpClient,
    private uuidGenerator: UUIDGenerator,
    private cron: CronJob,
    private podcastExtractor: PodcastExtractor,
    private podcastFinder: PodcastEpisodeFinder,
    private podcastEpisodeRepository: PodcastEpisodeRepository
  ) {}

  public async run(): Promise<void> {
    this.extract();

    // exectcute extract all thursday at 19h CEST
    this.cron.schedule("0 17,18,19,20,21 * * THU", () => this.extract());
    this.cron.start();
  }

  public async extract(): Promise<void> {
    const lastEpisode = await this.podcastFinder
      .findLastPublished()
      .catch(() => null);
    const newsEpisodes = await this.podcastExtractor.extract(
      this.httpClient,
      this.uuidGenerator,
      lastEpisode?.pubDate.value
    );

    await asyncForeach(newsEpisodes, async (episode) => {
      await this.podcastEpisodeRepository.save(episode).catch();
    });
  }
}
