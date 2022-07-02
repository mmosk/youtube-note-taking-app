import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, cb) =>
      cb({ id: profile.id, name: profile.displayName })
  )
);

passport.serializeUser((user, cb) =>
  cb(null, { id: user.id, name: user.name })
);
passport.deserializeUser((user, cb) => cb(null, user));

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => res.redirect("/")
);

app.listen(PORT, () =>
  console.log(`The server is up and running on PORT ${PORT}`)
);
