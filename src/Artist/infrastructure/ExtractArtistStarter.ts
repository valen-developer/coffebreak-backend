import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ArtistExtractoCrontab } from '../application/ArtistExtractorCrontab';

@Injectable()
export class ExtractArtistStarter implements OnApplicationBootstrap {
  constructor(private extractArtistJob: ArtistExtractoCrontab) {}

  onApplicationBootstrap() {
    this.extractArtistJob.run();
  }
}
