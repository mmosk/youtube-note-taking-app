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
    async (
      accessToken,
      refreshToken,
      { id: googleId, _json: { name, picture } },
      cb
    ) => {
      const user = await User.findOne({ googleId });
      if (user) return cb(null, user);
      const newUser = await new User({
        googleId,
        name,
        picture,
        accessToken,
        refreshToken,
      }).save();
      if (newUser) return cb(null, newUser);
    }
  )
);

passport.serializeUser((user, cb) => cb(null, user.id));

passport.deserializeUser((id, cb) => {
  User.findOne({ id })
    .then((user) => cb(null, user))
    .catch(() => cb(new Error("Failed to deserialize an user")));
});
