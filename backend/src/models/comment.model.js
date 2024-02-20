import { Schema, model } from "mongoose";

const commentShema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    task_id: {
      type: Schema.Types.ObjectId,
      ref: "Tasks",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Comments", commentShema);
