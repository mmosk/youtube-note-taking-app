import { Router } from "express";
import { authCheck } from "../auth/middleware.js";
import Video from "./video.model.js";

const router = Router();

router.use(authCheck);

router.get("/", async (req, res) => {
  const videos = await Video.find().exec();
  res.json(videos);
});

router.get("/:youtubeVideoId", async (req, res) => {
  const youtubeVideoId = req.params.youtubeVideoId;

  const video = await Video.findOne({
    user: req.user.id,
    youtubeVideoId,
  }).exec();
  if (video) return res.json(video);
  const newVideo = await new Video({
    youtubeVideoId,
    user: req.user.id,
    notes: [],
  }).save();
  res.json(newVideo);
});

router.post("/:youtubeVideoId/note", async (req, res) => {
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
});

router.delete("/:youtubeVideoId/note/:noteId", async (req, res) => {
  const video = await Video.findOneAndUpdate(
    {
      user: req.user.id,
      youtubeVideoId: req.params.youtubeVideoId,
    },
    { $pull: { notes: { _id: req.params.noteId } } },
    { new: true }
  ).exec();
  res.json(video);
});

export default router;
