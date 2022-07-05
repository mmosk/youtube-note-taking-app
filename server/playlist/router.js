import { Router } from "express";
import { authCheck } from "../auth/middleware.js";
import Playlist from "./playlist.model.js";

const router = Router();

router.use(authCheck);

router.get("/:playlistId", async (req, res) => {
  const playlistId = req.params.playlistId;

  try {
    const playlist = await Playlist.findOne({ _id: playlistId }).exec();
    res.json(playlist);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
