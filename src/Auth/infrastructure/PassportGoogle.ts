import { Inject, OnApplicationBootstrap } from '@nestjs/common';
import { NestContainer } from '@nestjs/core';
import * as passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { enviroment as enviromentFn } from 'src/helpers/enviroment';
import { GoogleSignup } from '../application/GoogleSignup';

export class PassportGoogleStategy implements OnApplicationBootstrap {
  //random between 0 and 100
  private random = Math.floor(Math.random() * 100);

  constructor(private googleSignup: GoogleSignup) {}

  onApplicationBootstrap() {
    this.configurePassport();
  }

  public configurePassport(): void {
    const enviroment = enviromentFn();

    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((user: any, done) => {
      done(null, user);
    });

    passport.use(
      'google',
      new GoogleStrategy(
        {
          clientID: enviroment.googleKeys.cliendId,
          clientSecret: enviroment.googleKeys.clientSecret,
          callbackURL: enviroment.googleSingin.callbackUrl,
          passReqToCallback: true,
          scope: ['profile', 'email'],
        },
        (
          req: any,
          accessToken: any,
          refreshToken: any,
          profile: any,
          done: any,
        ) => {
          this.verify(
            this.googleSignup,
            req,
            accessToken,
            refreshToken,
            profile,
            done,
          );
        },
        // this.verify,
      ),
    );
  }

  private async verify(
    googleSignup: GoogleSignup,
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<void> {
    try {
      const { email, name } = profile._json;
      const { picture } = profile;
      await googleSignup.signup({ email, name, imageUrl: picture });

      return done(null, profile);
    } catch (error) {
      return done(null, { fail: true });
    }
  }
}
