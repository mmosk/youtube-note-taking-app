import { Router } from "express";
import { authCheck } from "../auth/middleware.js";
import Video from "./video.model.js";

const router = Router();

router.use(authCheck);

router.get("/:youtubeVideoId", async (req, res) => {
  const youtubeVideoId = req.params.youtubeVideoId;

  try {
    const video = await Video.findOne({ youtubeVideoId }).exec();
    if (video) return res.json(video);
    const newVideo = await new Video({
      youtubeVideoId,
      user: req.user.id,
      notes: [],
    }).save();
    res.json(newVideo);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
