import {
  MiddlewareConsumer,
  Module,
  Provider,
  RequestMethod,
} from '@nestjs/common';
import { ImageModule } from 'src/Image/image.module';

import { ValidateJWTMiddleware } from 'src/Shared/middlewares/ValidateJWT.middleware';
import { SharedModule } from 'src/Shared/shared.module';
import { UserModule } from 'src/User/user.module';
import { GoogleLogin } from './application/GoogleLogin';
import { GoogleSignup } from './application/GoogleSignup';
import { LoginUser } from './application/LoginUser';
import { PasswordChanger } from './application/PasswordChanger';
import { PasswordRecover } from './application/PasswordRecover';
import { SignupUser } from './application/SingupUser';
import { AuthController } from './auth.controller';
import { GoogleOAuthController } from './googleOAuth.controller';
import { GoogleCallbackMiddleware } from './infrastructure/GoogleCallback.middleware';
import { PassportGoogleStategy } from './infrastructure/PassportGoogle';

const useCases: Provider[] = [
  GoogleLogin,
  GoogleSignup,
  LoginUser,
  PasswordChanger,
  PasswordRecover,
  SignupUser,
  {
    provide: PassportGoogleStategy,
    useFactory: (googleSignup: GoogleSignup) =>
      new PassportGoogleStategy(googleSignup),
    inject: [GoogleSignup],
  },
];

@Module({
  controllers: [AuthController, GoogleOAuthController],
  imports: [UserModule, SharedModule, ImageModule],
  providers: [...useCases],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GoogleCallbackMiddleware).forRoutes({
      path: '/auth/google/callback',
      method: RequestMethod.GET,
    });
  }
}
