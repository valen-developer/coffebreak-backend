import {
  MiddlewareConsumer,
  Module,
  Provider,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ImageModule } from 'src/Image/image.module';
import { EventEmitter } from 'src/Shared/domain/interfaces/EventEmitter';
import { JWT } from 'src/Shared/domain/interfaces/JWT.interface';
import { Mailer } from 'src/Shared/domain/interfaces/Mailer.interface';
import { NativeEventEmitter } from 'src/Shared/infrastructure/NativeEventEmitter';
import { ValidateJWTMiddleware } from 'src/Shared/middlewares/ValidateJWT.middleware';
import { SharedModule } from 'src/Shared/shared.module';
import { LoginUser } from './application/LoginUser';
import { PasswordChanger } from './application/PasswordChanger';
import { PasswordRecover } from './application/PasswordRecover';
import { RegisterEmailSender } from './application/RegisterEmailSender';
import { SignupUser } from './application/SingupUser';
import { UserCreator } from './application/UserCreator';
import { UserFinder } from './application/UserFinder';
import { UserStatusUpdater } from './application/UserStatusUpdater';
import { UserUpdater } from './application/UserUpdater';
import { UserValidator } from './application/UserValidator';
import { AuthController } from './auth.controller';
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
  LoginUser,
  SignupUser,
  UserValidator,
  UserStatusUpdater,
  PasswordRecover,
  PasswordChanger,
  RegisterEmailSender,
];

@Module({
  controllers: [AuthController],
  imports: [
    SharedModule,
    ImageModule,
    MongooseModule.forFeature([{ name: USER_NAME, schema: MongoUserSchema }]),
  ],
  providers: [...providers, ...useCases],
  exports: [...providers, ...useCases],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateJWTMiddleware)
      .exclude({
        path: '(.*)/login',
        method: RequestMethod.POST,
      })
      .forRoutes(AuthController);
  }
}
