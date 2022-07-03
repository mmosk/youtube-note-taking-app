import mongoose from "mongoose";

const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  youtubeVideoId: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.ObjectId,
    required: true,
  },
  notes: [
    {
      text: { type: String, required: true },
    },
    {
      time: { type: Number, required: true },
    },
  ],
});

export default mongoose.model("Video", VideoSchema);
