import { Module, Provider } from '@nestjs/common';
import { ImageCreator } from './application/ImageCreator';
import { ImageDeleter } from './application/ImageDeleter';
import { ImageDuplicator } from './application/ImageDuplicator';
import { ImageFinder } from './application/ImageFinder';
import { ImageUpdater } from './application/ImageUpdater';
import { ImageRepository } from './domain/interfaces/ImageRepository.interface';
import { MongoImageRepository } from './infrastructure/MongoImageRepository/MongoImageRepository';

const providers: Provider[] = [
  {
    provide: ImageRepository,
    useClass: MongoImageRepository,
  },
];

const useCases = [
  ImageCreator,
  ImageDeleter,
  ImageDuplicator,
  ImageFinder,
  ImageUpdater,
];

@Module({
  providers: [...providers, ...useCases],
})
export class ImageModule {}
