import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
});

export default mongoose.model("User", UserSchema);
