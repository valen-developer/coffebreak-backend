import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EpisodeTrackCreator } from './application/EpisodeTrackCreator';
import { EpisodeTrackFinder } from './application/EpisodeTrackFinder';
import { EpisodeTrackRepository } from './domain/interfaces/EpisodeTrackRepository.interface';
import { EpisodeTrackController } from './episode-track.controller';
import { MongoEpisodeTrackRepository } from './infrastructure/MongoEpisodeTrackRepository';
import {
  EPISODE_TRACK_NAME,
  MongoEpisodeTrackSchema,
} from './infrastructure/MongoEpisodeTrackSchema';

const provider: Provider[] = [
  {
    provide: EpisodeTrackRepository,
    useClass: MongoEpisodeTrackRepository,
  },
];

const useCases = [EpisodeTrackFinder, EpisodeTrackCreator];

@Module({
  controllers: [EpisodeTrackController],
  providers: [...provider, ...useCases],
  exports: [...useCases, ...provider],
  imports: [
    MongooseModule.forFeature([
      { name: EPISODE_TRACK_NAME, schema: MongoEpisodeTrackSchema },
    ]),
  ],
})
export class EpisodeTrackModule {}
