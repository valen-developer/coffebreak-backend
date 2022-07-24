import { Controller, Get, Next, Req, Res, UseGuards } from '@nestjs/common';

import * as passport from 'passport';
import { enviroment as enviromentFn } from 'src/helpers/enviroment';
import { GoogleLogin } from './application/GoogleLogin';

@Controller('auth/google')
export class GoogleOAuthController {
  constructor(private googleLogin: GoogleLogin) {}

  @Get()
  public async login(@Req() req: any, @Res() res: any, @Next() next: any) {
    return passport.authenticate('google', { scope: ['profile', 'email'] })(
      req,
      res,
      next,
    );
  }

  @Get('callback')
  public async callback(@Req() req: any, @Res() res: any, @Next() next: any) {
    const enviroment = enviromentFn();

    const SUCCESS_URL = `${enviroment.webappUrl}/auth/rrss/success`;
    const FAILURE_URL = `${enviroment.webappUrl}/auth/rrss/failure`;

    const sessionUser = req.user;

    if (!sessionUser) {
      res.redirect(FAILURE_URL);
      return;
    }

    const { email } = sessionUser as {
      email: string;
    };

    const { token } = await this.googleLogin.login({ email });

    res.redirect(`${SUCCESS_URL}?token=${token}`);
  }
}