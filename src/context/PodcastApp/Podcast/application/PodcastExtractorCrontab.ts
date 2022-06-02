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

    // execute extract every second between 22:00 and 23:00 (UTC)
    this.cron.schedule("10 */1 * * * 5", async () => {
      await this.extract();
    });
    this.cron.start();
  }

  public async extract(): Promise<void> {
    console.log("extracting podcasts");
    console.log(new Date().toISOString());
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
