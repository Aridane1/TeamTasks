import mongoose from "mongoose";

import Configuration from "../models/configuration.model";
import Task from "../models/task.model";
import Tag from "../models/tag.model";
import User from "../models/user.model";
import TagTask from "../models/tagTask.model";
import UserTask from "../models/userTask.model";
import Device from "../models/device.model";

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
    await User.deleteMany();
    await TagTask.deleteMany();
    await UserTask.deleteMany();
    await Device.deleteMany();

    console.log("Delete all registers in the database");
  } catch (err) {
    console.log(err);
  }
};
