import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PodcastEpisodeModule } from 'src/Podcast/podcast-episode.module';
import { SharedModule } from 'src/Shared/shared.module';
import { ArtistCreator } from './application/ArtistCreator';
import { ArtistCreatorForExtraction } from './application/ArtistCreatorForExtraction';
import { ArtistExtractoCrontab } from './application/ArtistExtractorCrontab';
import { ArtistFinder } from './application/ArtistFinder';
import { ArtistUpdater } from './application/ArtistUpdater';
import { ArtistController } from './artist.controller';
import { ArtistExtractor } from './domain/interfaces/ArtistExtractor.interface';
import { ArtistRepository } from './domain/interfaces/ArtistRepository.interface';
import { ExtractArtistStarter } from './infrastructure/ExtractArtistStarter';
import { FtpArtistExtractor } from './infrastructure/FtpArtistExtractor';
import {
  ARTIST_NAME,
  MongoArtistModel,
  MongoArtistSchema,
} from './infrastructure/MongoArtistRepository/MongoArtist';
import { MongoArtistRepository } from './infrastructure/MongoArtistRepository/MongoArtistRepository';

const providers: Provider[] = [
  {
    provide: ArtistExtractor,
    useClass: FtpArtistExtractor,
  },
  {
    provide: ArtistRepository,
    useClass: MongoArtistRepository,
  },
];

const useCases = [
  ArtistCreator,
  ArtistCreatorForExtraction,
  ArtistExtractoCrontab,
  ArtistFinder,
  ArtistUpdater,
  ExtractArtistStarter,
];

@Module({
  imports: [
    PodcastEpisodeModule,
    SharedModule,
    MongooseModule.forFeature([
      { name: ARTIST_NAME, schema: MongoArtistSchema },
    ]),
  ],
  controllers: [ArtistController],
  providers: [...providers, ...useCases],
})
export class ArtistModule {}
