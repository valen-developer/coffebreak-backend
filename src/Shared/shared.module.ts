import { Module, Provider } from '@nestjs/common';

import { enviroment as enviromentFn } from 'src/helpers/enviroment';

import { ImageDownloader } from './application/ImageDownloader';
import { TempDirCleaner } from './application/TempDirCleaner';
import { CronJob } from './domain/interfaces/Cronjob.interface';
import { ICrypt } from './domain/interfaces/Crypt.interface';
import { EventEmitter } from './domain/interfaces/EventEmitter';
import { Faker } from './domain/interfaces/Faker.interface';
import { FileUploader } from './domain/interfaces/FileUploader';
import { FormDataParser } from './domain/interfaces/FormDataParser.interface';
import { HttpClient } from './domain/interfaces/HttpClient.interface';
import { JWT } from './domain/interfaces/JWT.interface';
import { Mailer } from './domain/interfaces/Mailer.interface';
import { QueryBuilder } from './domain/interfaces/QueryBuilder.interface';
import { UUIDGenerator } from './domain/interfaces/UuidGenerator';
import { BCrypt } from './infrastructure/BCrypt';
import { Fakerjs } from './infrastructure/Fakerjs';
import { FormidableFormDataParser } from './infrastructure/FormidableFormDataParser';
import { FsFileUploader } from './infrastructure/FsFileUploader';
import { JsonWebTokenJWT } from './infrastructure/JsonWebTokenJWT';
import { MongoQueryBuilder } from './infrastructure/MongoQueryBuilder';
import { NanoUuidGenerator } from './infrastructure/NanoUuidGenerator';
import { NativeEventEmitter } from './infrastructure/NativeEventEmitter';
import { NodeFetchHttpClient } from './infrastructure/NodeFetchHttpClient';
import { NodeMailer } from './infrastructure/NodeMailer';

const providers: Provider[] = [
  {
    provide: ICrypt,
    useClass: BCrypt,
  },
  {
    provide: EventEmitter,
    useClass: NativeEventEmitter,
  },
  {
    provide: Faker,
    useClass: Fakerjs,
  },
  {
    provide: FileUploader,
    useClass: FsFileUploader,
  },
  {
    provide: FormDataParser,
    useClass: FormidableFormDataParser,
  },
  {
    provide: HttpClient,
    useClass: NodeFetchHttpClient,
  },
  {
    provide: JWT,
    useClass: JsonWebTokenJWT,
  },

  {
    provide: QueryBuilder,
    useClass: MongoQueryBuilder,
  },
  {
    provide: UUIDGenerator,
    useClass: NanoUuidGenerator,
  },
];

const useCases: Provider[] = [ImageDownloader, TempDirCleaner];

const NodeMailerFactory = (): Mailer => {
  const enviroment = enviromentFn();

  return new NodeMailer({
    auth: {
      user: enviroment.mailer.mail,
      pass: enviroment.mailer.password,
    },
    host: enviroment.mailer.host,
    port: Number(enviroment.mailer.port),
    secure: true,
  });
};

const providerWithFactory: Provider[] = [
  {
    provide: Mailer,
    useFactory: NodeMailerFactory,
  },
];

@Module({
  providers: [...providers, ...providerWithFactory, ...useCases],
  exports: [...providers, ...providerWithFactory, ...useCases],
})
export class SharedModule {}
