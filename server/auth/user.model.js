import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  googleId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  watchLater: {
    type: Schema.ObjectId,
    required: true,
  },
  playlists: [Schema.ObjectId],
});

export default mongoose.model("User", UserSchema);
