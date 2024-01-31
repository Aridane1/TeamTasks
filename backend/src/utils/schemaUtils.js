import mongoose from "mongoose";

import Configuration from "../models/configuration.model";
import Task from "../models/task.model";
import Tag from "../models/tag.model";
import Notification from "../models/notification.model";
import User from "../models/user.model";
import TagTask from "../models/tagTask.model";
import TaskNotification from "../models/taskNotification.model";
import UserTask from "../models/userTask.model";

export const deleteSchemas = () => {
  const db = mongoose.connection;
  db.once("open", async () => {
    schemaUtils();
  });
};

const schemaUtils = async () => {
  try {
    await Task.deleteMany();
    await Configuration.deleteMany();
    await Tag.deleteMany();
    await Notification.deleteMany();
    await User.deleteMany();
    await TagTask.deleteMany();
    await TagTask.deleteMany();
    await TaskNotification.deleteMany();
    await UserTask.deleteMany();

    console.log("Delete all registers in the database");
  } catch (err) {
    console.log(err);
  }
};
