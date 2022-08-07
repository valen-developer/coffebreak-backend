import { Injectable, Logger } from '@nestjs/common';
import { ArtistExtractor } from '../domain/interfaces/ArtistExtractor.interface';

const logger = new Logger('ArtistExtractorCrontab');

@Injectable()
export class ArtistExtractoCrontab {
  constructor(private artistExtractor: ArtistExtractor) {}

  public run(): Promise<void> {
    logger.log('starting extract artist cron job');
    this.extract();

    return Promise.resolve();
  }

  public async extract(): Promise<void> {
    console.log('extracting artists');
    const artists = await this.artistExtractor.extract();
  }
}
