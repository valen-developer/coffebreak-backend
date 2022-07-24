import { Injectable, Logger } from '@nestjs/common';
import { CronJob } from '../../Shared/domain/interfaces/Cronjob.interface';
import { ArtistExtractor } from '../domain/interfaces/ArtistExtractor.interface';

const logger = new Logger('ArtistExtractorCrontab');

@Injectable()
export class ArtistExtractoCrontab {
  constructor(
    private cron: CronJob,
    private artistExtractor: ArtistExtractor,
  ) {}

  public run(): Promise<void> {
    logger.log('starting extract artist cron job');
    this.extract();
    this.cron.schedule('10 */2 * * * 5', async () => {
      await this.extract();
    });

    this.cron.start();

    return Promise.resolve();
  }

  public async extract(): Promise<void> {
    console.log('extracting artists');
    const artists = await this.artistExtractor.extract();
  }
}
