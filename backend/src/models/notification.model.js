import { Schema, model } from "mongoose";

const notificationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true,
      }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default model("Notifications", notificationSchema);