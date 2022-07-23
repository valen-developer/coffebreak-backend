import { Module, Provider } from '@nestjs/common';
import { ArtistCreator } from './application/ArtistCreator';
import { ArtistCreatorForExtraction } from './application/ArtistCreatorForExtraction';
import { ArtistExtractoCrontab } from './application/ArtistExtractorCrontab';
import { ArtistFinder } from './application/ArtistFinder';
import { ArtistUpdater } from './application/ArtistUpdater';
import { ArtistExtractor } from './domain/interfaces/ArtistExtractor.interface';
import { ArtistRepository } from './domain/interfaces/ArtistRepository.interface';
import { FtpArtistExtractor } from './infrastructure/FtpArtistExtractor';
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
];

@Module({
  providers: [...providers, ...useCases],
})
export class ArtistModule {}
