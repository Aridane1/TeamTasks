import { Schema, model, Types } from "mongoose";

const tagTaskSchema = new Schema(
  {
    tag_id: {
      type: Types.ObjectId,
      ref: "Tags",
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

export default model("TagTask", tagTaskSchema);
