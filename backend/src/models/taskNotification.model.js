import { Schema, model, Types } from "mongoose";

const taskNotificationSchema = new Schema(
  {
    task_id: {
      type: Types.ObjectId,
      ref: "Tasks",
      required: true,
    },
    notification_id: {
      type: Types.ObjectId,
      ref: "Notifications",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("TaskNotification", taskNotificationSchema);
