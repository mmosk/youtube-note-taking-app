import mongoose from "mongoose";
import findOrCreatePlugin from "mongoose-findorcreate";

const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

UserSchema.plugin(findOrCreatePlugin);

export default mongoose.model("User", UserSchema);
