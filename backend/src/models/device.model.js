import { Schema, model } from "mongoose";

const deviceSchema = new Schema({
  endpoint: {
    type: String,
    required: true,
  },
  keys: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});

export default model("Devices", deviceSchema);
