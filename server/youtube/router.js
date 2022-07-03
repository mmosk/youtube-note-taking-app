import { Router } from "express";
import { google } from "googleapis";

const router = Router();

const youtubeAuth = (req, res, next) => {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CALLBACK_URL
  );

  auth.setCredentials({
    access_token: req.user.accessToken,
    refresh_token: req.user.refreshToken,
  });

  req.youtube = { auth };

  next();
};

const playlistMapper = (playlist) => ({
  id: playlist.id,
  title: playlist.snippet.title,
});

router.get("/playlists", youtubeAuth, (req, res) => {
  google
    .youtube({ version: "v3", auth: req.youtube.auth })
    .playlists.list(
      { part: "snippet", mine: true, headers: {} },
      (err, { data }, response) => {
        if (err) return res.json({ err });
        if (data)
          return res.json({ playlists: data.items.map(playlistMapper) });
        if (response) return res.json({ response });
      }
    );
});

export default router;
