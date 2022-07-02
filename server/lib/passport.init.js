import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import User from "../auth/user.model.js";

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, cb) =>
      User.findOrCreate(
        { id: profile.id, name: profile.displayName },
        (err, user) => cb(err, user)
      )
  )
);

passport.serializeUser((user, cb) => cb(null, user.id));

passport.deserializeUser((id, cb) => {
  User.find({ id })
    .then((user) => cb(null, user))
    .catch(() => cb(new Error("Failed to deserialize an user")));
});
