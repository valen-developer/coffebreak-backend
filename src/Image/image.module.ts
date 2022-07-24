import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SharedModule } from 'src/Shared/shared.module';

import { ImageCreator } from './application/ImageCreator';
import { ImageDeleter } from './application/ImageDeleter';
import { ImageDuplicator } from './application/ImageDuplicator';
import { ImageFinder } from './application/ImageFinder';
import { ImageUpdater } from './application/ImageUpdater';
import { ImageRepository } from './domain/interfaces/ImageRepository.interface';
import { MongoImageRepository } from './infrastructure/MongoImageRepository/MongoImageRepository';
import {
  IMAGE_NAME,
  MongoImageSchema,
} from './infrastructure/MongoImageRepository/MongoImageSchema';

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
  imports: [
    SharedModule,
    MongooseModule.forFeature([{ name: IMAGE_NAME, schema: MongoImageSchema }]),
  ],
  exports: [...providers, ...useCases],
  providers: [...providers, ...useCases],
})
export class ImageModule {}
