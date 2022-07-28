import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EpisodeTrackModule } from 'src/EpisodeTrack/episode-track.module';

import { SharedModule } from 'src/Shared/shared.module';
import { PodcastEpisodeFinder } from './application/PodcastEpisodeFinder';
import { PodcastExtractorCrontab } from './application/PodcastExtractorCrontab';
import { PodcastEpisodeRepository } from './domain/interfaces/PodcastEpisodeRepository.interface';
import { PodcastExtractor } from './domain/interfaces/PodcastExtractor.interface';
import { EpisodeNotificationGateway } from './episode-notification.gateway';
import { PodcastEpisodeController } from './episode.controller';
import { IvooxPodcastExtractor } from './infrastructure/IvooxPodcastExtractor';
import { MongoPodcastEpisodeRepository } from './infrastructure/MongoPodcastEpisodeRepository';
import {
  EPISODE_NAME,
  MongoEpisodeSchema,
} from './infrastructure/MongoPodcastEpisodeSchema';

const providers: Provider[] = [
  {
    provide: PodcastEpisodeRepository,
    useClass: MongoPodcastEpisodeRepository,
  },
  {
    provide: PodcastExtractor,
    useClass: IvooxPodcastExtractor,
  },
];

const useCases = [
  PodcastEpisodeFinder,
  PodcastExtractorCrontab,
  EpisodeNotificationGateway,
];

@Module({
  controllers: [PodcastEpisodeController],
  imports: [
    SharedModule,
    EpisodeTrackModule,
    MongooseModule.forFeature([
      { name: EPISODE_NAME, schema: MongoEpisodeSchema },
    ]),
  ],
  exports: [...useCases],
  providers: [...providers, ...useCases],
})
export class PodcastEpisodeModule {}
