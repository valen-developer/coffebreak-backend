import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ImageModule } from 'src/Image/image.module';
import { SharedModule } from 'src/Shared/shared.module';
import { OnPasswordRecoveryEmailSender } from './application/OnPasswordRecoveryEmailSender';
import { OnSignupEmailSender } from './application/OnSignupEmailSender';
import { UserCreator } from './application/UserCreator';
import { UserDeleter } from './application/UserDeleter';
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
import { UserController } from './user.controller';

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
  UserDeleter,
  OnSignupEmailSender,
  OnPasswordRecoveryEmailSender,
];

@Module({
  controllers: [UserController],
  imports: [
    SharedModule,
    ImageModule,
    MongooseModule.forFeature([{ name: USER_NAME, schema: MongoUserSchema }]),
  ],
  providers: [...providers, ...useCases],
  exports: [...providers, ...useCases],
})
export class UserModule {}
