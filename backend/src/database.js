import { connect } from "mongoose";
import { MONGODB_URI } from "./config";
import Task from "./models/task.model";
(async () => {
  try {
    const db = await connect(MONGODB_URI);
    Task;
    console.log("DB connected to", db.connection.name);
  } catch (err) {
    console.log(`MongoDB connection error: ${err}`);
  }
})();
