import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ImageModule } from 'src/Image/image.module';
import { SharedModule } from 'src/Shared/shared.module';
import { RegisterEmailSender } from './application/RegisterEmailSender';
import { UserCreator } from './application/UserCreator';
import { UserFinder } from './application/UserFinder';
import { UserStatusUpdater } from './application/UserStatusUpdater';
import { UserUpdater } from './application/UserUpdater';
import { UserValidator } from './application/UserValidator';
import { UserRepository } from './domain/interfaces/UserRepository.interface';
import { MongoUserRepository } from './infrastructure/MongoUserRepository/MongoUserRepository';
import {
  MongoUserSchema,
  USER_NAME,
} from './infrastructure/MongoUserRepository/MongoUserSchema';

const providers: Provider[] = [
  {
    provide: UserRepository,
    useClass: MongoUserRepository,
  },
];

const useCases = [
  UserFinder,
  UserCreator,
  UserUpdater,
  UserValidator,
  UserStatusUpdater,
  RegisterEmailSender,
];

@Module({
  controllers: [],
  imports: [
    SharedModule,
    ImageModule,
    MongooseModule.forFeature([{ name: USER_NAME, schema: MongoUserSchema }]),
  ],
  providers: [...providers, ...useCases],
  exports: [...providers, ...useCases],
})
export class UserModule {}
