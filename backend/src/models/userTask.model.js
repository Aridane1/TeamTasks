import { Schema, model, Types } from "mongoose";

const userTaskSchema = new Schema(
  {
    user_id: {
      type: Types.ObjectId,
      ref: "Users",
      required: true,
    },
    task_id: {
      type: Types.ObjectId,
      ref: "Tasks",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("UserTask", userTaskSchema);
