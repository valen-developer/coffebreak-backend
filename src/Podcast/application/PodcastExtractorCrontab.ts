import { asyncForeach } from 'src/helpers/functions/asyncForeach.function';
import { Events } from '../../Shared/domain/constants/Events';
import { CronJob } from '../../Shared/domain/interfaces/Cronjob.interface';
import { EventEmitter } from '../../Shared/domain/interfaces/EventEmitter';
import { HttpClient } from '../../Shared/domain/interfaces/HttpClient.interface';
import { UUIDGenerator } from '../../Shared/domain/interfaces/UuidGenerator';
import { PodcastEpisodeRepository } from '../domain/interfaces/PodcastEpisodeRepository.interface';
import { PodcastExtractor } from '../domain/interfaces/PodcastExtractor.interface';
import { PodcastEpisodeFinder } from './PodcastEpisodeFinder';

export class PodcastExtractorCrontab {
  constructor(
    private httpClient: HttpClient,
    private uuidGenerator: UUIDGenerator,
    private cron: CronJob,
    private podcastExtractor: PodcastExtractor,
    private podcastFinder: PodcastEpisodeFinder,
    private podcastEpisodeRepository: PodcastEpisodeRepository,
    private eventEmitter: EventEmitter,
  ) {}

  public async run(): Promise<void> {
    this.extract();

    // execute extract every second between 22:00 and 23:00 (UTC)
    this.cron.schedule('10 */2 * * * 5', async () => {
      await this.extract();
    });
    this.cron.start();
  }

  public async extract(): Promise<void> {
    console.log('extracting podcasts');
    // timezone Madrid
    console.log(
      new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' }),
    );
    const lastEpisode = await this.podcastFinder
      .findLastPublished()
      .catch(() => null);
    const newsEpisodes = await this.podcastExtractor.extract(
      this.httpClient,
      this.uuidGenerator,
      lastEpisode?.pubDate.value,
    );

    await asyncForeach(newsEpisodes, async (episode) => {
      await this.podcastEpisodeRepository.save(episode).catch();
      this.eventEmitter.emit(Events.NEW_EPISODE, episode);
    });
  }
}
