import { Injectable, NestMiddleware } from '@nestjs/common';
import * as passport from 'passport';

@Injectable()
export class GoogleCallbackMiddleware implements NestMiddleware {
  public use(req: any, res: any, next: (error?: any) => void) {
    passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ],
      session: false,
    })(req, res, next);
  }
}
