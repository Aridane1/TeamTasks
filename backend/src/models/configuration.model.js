import { Schema, model } from "mongoose";

const configurationSchema = new Schema(
  {
    night_mode: {
      type: Boolean,
    },
    list_mode: {
      type: Boolean,
    },
    user_image: {
      type: String,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default model("Configurations", configurationSchema);
