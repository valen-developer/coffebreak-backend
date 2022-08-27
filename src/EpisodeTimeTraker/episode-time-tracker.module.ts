import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/Shared/shared.module';
import { UserModule } from 'src/User/user.module';
import { EpisodeTimeTrackerCreator } from './application/EpisodeTimeTrackerCreator';
import { EpisodeTimeTrackerFinder } from './application/EpisodeTimeTrackerFinder';
import { EpisodeTimeTrackerLastEarsFinder } from './application/EpisodeTimeTrackerLastEarsFinder';
import { EpisodeTimeTrackerUpdater } from './application/EpisodeTimeTrackerUpdate';
import { EpisodeTimeTrackerRepository } from './domain/interfaces/EpisodeTimeTrackerRepository.interface';
import { EpisodeTimeTrackerController } from './episode-time-tracker.controller';
import { MongoEpisodeTrackRepository } from './infrastructure/MongoEpisodeTimeTrackerRepository';
import {
  EPISODE_TIME_TRACKER_NAME,
  MongoEpisodeTimeTrackerSchema,
} from './infrastructure/MongoEpisodeTimeTrackerSchema';

const providers: Provider[] = [
  {
    provide: EpisodeTimeTrackerRepository,
    useClass: MongoEpisodeTrackRepository,
  },
];

const useCases = [
  EpisodeTimeTrackerCreator,
  EpisodeTimeTrackerFinder,
  EpisodeTimeTrackerUpdater,
  EpisodeTimeTrackerLastEarsFinder,
];

@Module({
  imports: [
    SharedModule,
    UserModule,
    MongooseModule.forFeature([
      {
        name: EPISODE_TIME_TRACKER_NAME,
        schema: MongoEpisodeTimeTrackerSchema,
      },
    ]),
  ],
  controllers: [EpisodeTimeTrackerController],
  providers: [...providers, ...useCases],
})
export class EpisodeTimeTrackerModule {}
