import {
  MiddlewareConsumer,
  Module,
  Provider,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageModule } from 'src/Image/image.module';
import { PodcastEpisodeModule } from 'src/Podcast/podcast-episode.module';
import { ValidateJWTMiddleware } from 'src/Shared/middlewares/ValidateJWT.middleware';
import { SharedModule } from 'src/Shared/shared.module';
import { UserModule } from 'src/User/user.module';

import { PlaylistCreator } from './application/PlaylistCreator';
import { PlaylistDeleter } from './application/PlaylistDeleter';
import { PlaylistDuplicator } from './application/PlaylistDuplicator';
import { PlaylistEpisodeUpdater } from './application/PlaylistEpisodeUpdater';
import { PlaylistFinder } from './application/PlaylistFinder';
import { PlaylistTematicCreator } from './application/PlaylistTematicCreator';
import { PlaylistUpdater } from './application/PlaylistUpdater';
import { PlaylistRepository } from './domain/interfaces/PlaylistRepository.interface';
import { ExtractEpisodeJobStarter } from './infrastructure/ExtractEpisodeJobStarter';
import { MongoPlaylistRepository } from './infrastructure/MongoPlaylistRepository/MongoPlaylistRepository';
import {
  MongoPlaylistSchema,
  PLAYLIST_NAME,
} from './infrastructure/MongoPlaylistRepository/MongoPlaylistSchema';
import { PlaylistCreatorController } from './playlistCreator.controller';
import { PlaylistFinderController } from './playlistFinder.controller';
import { ProtectedPlaylistDeleteController } from './protected-playlist-delete.controller';
import { ProtectedPlaylistUpdaterController } from './protected-playlist-updater.controller';
import { ProtectedPlaylistFinderController } from './protected-playlistFinder.controller';

const providers: Provider[] = [
  {
    provide: PlaylistRepository,
    useClass: MongoPlaylistRepository,
  },
];

const useCases = [
  PlaylistCreator,
  PlaylistDeleter,
  PlaylistDuplicator,
  PlaylistEpisodeUpdater,
  PlaylistFinder,
  PlaylistTematicCreator,
  PlaylistUpdater,
  ExtractEpisodeJobStarter,
];

@Module({
  controllers: [
    PlaylistCreatorController,
    ProtectedPlaylistFinderController,
    PlaylistFinderController,
    ProtectedPlaylistUpdaterController,
    ProtectedPlaylistDeleteController,
  ],
  imports: [
    SharedModule,
    ImageModule,
    PodcastEpisodeModule,
    UserModule,
    MongooseModule.forFeature([
      { name: PLAYLIST_NAME, schema: MongoPlaylistSchema },
    ]),
  ],
  providers: [...providers, ...useCases],
})
export class PlaylistModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(ValidateJWTMiddleware)
      .forRoutes(ProtectedPlaylistFinderController);
    consumer.apply(ValidateJWTMiddleware).forRoutes(PlaylistCreatorController);

    consumer
      .apply(ValidateJWTMiddleware)
      .forRoutes(ProtectedPlaylistUpdaterController);
    consumer
      .apply(ValidateJWTMiddleware)
      .forRoutes(ProtectedPlaylistDeleteController);
  }
}
