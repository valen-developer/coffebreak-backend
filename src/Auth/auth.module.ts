import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { ValidateJWTMiddleware } from 'src/Shared/middlewares/ValidateJWT.middleware';
import { SharedModule } from 'src/Shared/shared.module';
import { UserModule } from 'src/User/user.module';
import { LoginUser } from './application/LoginUser';
import { PasswordChanger } from './application/PasswordChanger';
import { PasswordRecover } from './application/PasswordRecover';
import { SignupUser } from './application/SingupUser';
import { AuthController } from './auth.controller';

const useCases = [LoginUser, PasswordChanger, PasswordRecover, SignupUser];

@Module({
  controllers: [AuthController],
  imports: [UserModule, SharedModule],
  providers: [...useCases],
})
export class AuthModule {
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
