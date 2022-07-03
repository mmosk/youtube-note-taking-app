import { Router } from "express";
import { youtube } from "./middleware.js";
import { playlistMapper } from "./mappers.js";

const router = Router();

router.use(youtube);

router.get("/playlists", (req, res) => {
  req.youtube.playlists.list(
    { part: "snippet", mine: true },
    (err, { data }) => {
      if (err) return res.sendStatus(500);
      const playlists = data.items.map(playlistMapper);
      res.json({ playlists });
    }
  );
});

export default router;
