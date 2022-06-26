import {
  Strategy as GoogleStrategy,
  VerifyFunctionWithRequest,
} from "passport-google-oauth2";
import passport from "passport";

const verify: VerifyFunctionWithRequest = (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  console.log(profile);
};

passport.use(
  new GoogleStrategy(
    {
      clientID: "clientID",
      clientSecret: "clientSecret",
      callbackURL: "http://localhost:3000/api/auth/google/callback",
      passReqToCallback: true,
    },
    verify
  )
);
