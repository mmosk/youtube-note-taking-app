import { Router } from "express";
import { authCheck } from "../auth/middleware.js";
import Video from "./video.model.js";

const router = Router();

router.use(authCheck);

router.get("/:youtubeVideoId", async (req, res) => {
  const youtubeVideoId = req.params.youtubeVideoId;
  const user = req.user.id;

  try {
    const video = await Video.findOne({ user, youtubeVideoId }).exec();
    if (video) return res.json(video);
    const newVideo = await new Video({
      youtubeVideoId,
      user,
      notes: [],
    }).save();
    res.json(newVideo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/:youtubeVideoId/note", async (req, res) => {
  try {
    // TODO: consider Document#save https://masteringjs.io/tutorials/mongoose/update
    const video = await Video.findOneAndUpdate(
      {
        user: req.user.id,
        youtubeVideoId: req.params.youtubeVideoId,
      },
      { $push: { notes: req.body } },
      { new: true }
    ).exec();
    res.json(video);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:youtubeVideoId/note/:noteId", async (req, res) => {
  try {
    const video = await Video.findOneAndUpdate(
      {
        user: req.user.id,
        youtubeVideoId: req.params.youtubeVideoId,
      },
      { $pull: { notes: { _id: req.params.noteId } } },
      { new: true }
    ).exec();
    res.json(video);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
