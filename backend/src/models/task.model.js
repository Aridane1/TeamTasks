import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    limit_day: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    task_image: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default model("Tasks", taskSchema);
