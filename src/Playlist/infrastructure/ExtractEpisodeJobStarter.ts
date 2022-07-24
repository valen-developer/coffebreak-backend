import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PodcastExtractorCrontab } from 'src/Podcast/application/PodcastExtractorCrontab';

@Injectable()
export class ExtractEpisodeJobStarter implements OnApplicationBootstrap {
  constructor(private episodeExtractorJob: PodcastExtractorCrontab) {}

  onApplicationBootstrap() {
    this.episodeExtractorJob.run();
  }
}
