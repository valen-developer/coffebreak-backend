import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { GoogleSignup } from "../../../context/PodcastApp/User/application/GoogleSignup";
import { enviroment } from "../../PodcastApp/backend/config/enviroment";
import { Container } from "../../PodcastApp/backend/dependency-injection/Container";
import { UserDependencies } from "../../PodcastApp/backend/dependency-injection/injectUserDependencies";

export class PassportGoogleStategy {
  public configurePassport(): void {
    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((user: any, done) => {
      done(null, user);
    });

    passport.use(
      "google",
      new GoogleStrategy(
        {
          clientID: enviroment.googleKeys.cliendId,
          clientSecret: enviroment.googleKeys.clientSecret,
          callbackURL: "http://localhost:3000/api/auth/google/callback",
          passReqToCallback: true,
          scope: ["profile", "email"],
        },
        this.verify
      )
    );
  }

  private async verify(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any
  ): Promise<void> {
    try {
      const container = Container.getInstance();
      const googleSignup = container.get<GoogleSignup>(
        UserDependencies.GoogleSignup
      );

      const { email, name } = profile._json;
      const { picture } = profile;
      await googleSignup.signup({ email, name, imageUrl: picture });

      return done(null, profile);
    } catch (error) {
      return done(null, { fail: true });
    }
  }
}
