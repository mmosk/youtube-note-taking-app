import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PlaylistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  videos: [Schema.ObjectId],
});

export default mongoose.model("Playlist", PlaylistSchema);
