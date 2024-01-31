import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";

import taskRouter from "./routes/task.routes";
import userRouter from "./routes/user.routes";
import configurationRouter from "./routes/configuration.routes";
import notificationRouter from "./routes/notification.routes";
import tagRouter from "./routes/tag.routes";
import tagTaskRouter from "./routes/tagTask.routes";
import taskNotificationRouter from "./routes/taskNotification.routes";
import userTaskRouter from "./routes/userTask.routes";

import verifyToken from "./middlewares/verifyToken.middleware";
import { schemaUtils } from "./utils/schemaUtils";

const app = express();

let corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(verifyToken);

app.use(morgan("dev"));

app.use("/api/task", taskRouter);
app.use("/api/user", userRouter);
app.use("/api/configuration", configurationRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/tag", tagRouter);
app.use("/api/tagTask", tagTaskRouter);
app.use("/api/taskNotification", taskNotificationRouter);
app.use("/api/userTask", userTaskRouter);

const db = mongoose.connection;
db.once("open", async () => {
  schemaUtils();
});

export default app;
