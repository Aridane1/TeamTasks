import { Schema, model } from "mongoose";

const tagSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default model("Tags", tagSchema);
