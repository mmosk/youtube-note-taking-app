import express from "express";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import "./env.js";
import "./lib/passport.init.js";
import authRouter from "./auth/router.js";
import youtubeRouter from "./youtube/router.js";
import playlistRouter from "./playlist/router.js";
import videoRouter from "./video/router.js";

const app = express();
const PORT = process.env.PORT || 5000;

const clientPromise = mongoose
  .connect(process.env.MONGODB_URI)
  .then((m) => m.connection.getClient());

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ clientPromise }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/youtube", youtubeRouter);
app.use("/playlist", playlistRouter);
app.use("/video", videoRouter);

app.listen(PORT, () =>
  console.log(`The server is up and running on PORT ${PORT}`)
);
