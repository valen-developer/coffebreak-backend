import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ArtistModule } from './Artist/artist.module';
import { AuthModule } from './Auth/auth.module';
import { EpisodeTimeTrackerModule } from './EpisodeTimeTraker/episode-time-tracker.module';
import { enviroment } from './helpers/enviroment';
import { ImageModule } from './Image/image.module';
import { PlaylistModule } from './Playlist/playlist.module';
import { PodcastEpisodeModule } from './Podcast/podcast-episode.module';
import { SharedModule } from './Shared/shared.module';
import { UserModule } from './User/user.module';

const EntitiesModules = [
  SharedModule,
  AuthModule,
  ArtistModule,
  UserModule,
  ImageModule,
  PlaylistModule,
  PodcastEpisodeModule,
  EpisodeTimeTrackerModule,
];

const ConfigModules = [
  ConfigModule.forRoot({
    envFilePath: ['.env'],
    isGlobal: true,
  }),
  MongooseModule.forRoot(enviroment().db.uri, {
    dbName: enviroment().db.name,
    auth: {
      username: enviroment().db.user,
      password: enviroment().db.password,
    },
  }),
  ScheduleModule.forRoot(),
];

@Module({
  imports: [...EntitiesModules, ...ConfigModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
