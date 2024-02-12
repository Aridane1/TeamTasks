import { Schema, model } from "mongoose";

const deviceSchema = new Schema({
  endpoint: {
    type: String,
    required: true,
  },
  keys: {
    p256dh: {
      type: String,
      required: true,
    },
    auth: {
      type: String,
      required: true,
    },
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});

export default model("Devices", deviceSchema);
