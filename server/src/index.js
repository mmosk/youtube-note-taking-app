import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import User from "../user.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const clientPromise = mongoose
  .connect(process.env.MONGODB_URI)
  .then((m) => m.connection.getClient());

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
    store: MongoStore.create({ clientPromise }),
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
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

app.listen(PORT, () =>
  console.log(`The server is up and running on PORT ${PORT}`)
);
