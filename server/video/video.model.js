import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
});

const VideoSchema = new Schema({
  youtubeVideoId: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.ObjectId,
    required: true,
  },
  notes: [NoteSchema],
});

export default mongoose.model("Video", VideoSchema);
