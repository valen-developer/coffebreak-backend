import { Injectable, Logger } from '@nestjs/common';

import { EpisodeTrackCreator } from 'src/EpisodeTrack/application/EpisodeTrackCreator';
import { asyncForeach } from 'src/helpers/functions/asyncForeach.function';
import { Events } from '../../Shared/domain/constants/Events';
import { CronJob } from '../../Shared/domain/interfaces/Cronjob.interface';
import { EventEmitter } from '../../Shared/domain/interfaces/EventEmitter';
import { HttpClient } from '../../Shared/domain/interfaces/HttpClient.interface';
import { UUIDGenerator } from '../../Shared/domain/interfaces/UuidGenerator';
import { PodcastEpisodeRepository } from '../domain/interfaces/PodcastEpisodeRepository.interface';
import { PodcastExtractor } from '../domain/interfaces/PodcastExtractor.interface';
import { PodcastEpisode } from '../domain/PodcastEpisode.model';
import { PodcastEpisodeFinder } from './PodcastEpisodeFinder';

const logger = new Logger('PodcastExtractorCrontab');

@Injectable()
export class PodcastExtractorCrontab {
  constructor(
    private httpClient: HttpClient,
    private uuidGenerator: UUIDGenerator,
    private cron: CronJob,
    private podcastExtractor: PodcastExtractor,
    private podcastFinder: PodcastEpisodeFinder,
    private podcastEpisodeRepository: PodcastEpisodeRepository,
    private trackCreator: EpisodeTrackCreator,
    private eventEmitter: EventEmitter,
  ) {}

  public async run(): Promise<void> {
    this.extract();

    // const everyThursdayEvery2minutes = '10 */2 * * * 5';
    // const everyminutes = '*/1 * * * *';

    // // execute extract every second between 22:00 and 23:00 (UTC)
    // this.cron.schedule(everyThursdayEvery2minutes, async () => {
    //   await this.extract();
    // });
    // this.cron.start();
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

    await this.extractTracks(newsEpisodes);
  }

  private async extractTracks(episodes: PodcastEpisode[]): Promise<void> {
    await asyncForeach(episodes, async (episode) => {
      await this.extractEpisodeTracks(episode);
    });
  }

  private async extractEpisodeTracks(episode: PodcastEpisode): Promise<void> {
    const tracks = this.podcastExtractor.extractTracks(
      episode.description.value,
    );

    await asyncForeach(tracks, async (t) => {
      await this.trackCreator
        .create({
          uuid: this.uuidGenerator.generate(),
          episodeUuid: episode.uuid.value,
          description: t.trackName,
          time: t.time,
        })
        .catch(() => {
          logger.error(`Error creating track ${t.time}`);
        });
    });
  }
}
