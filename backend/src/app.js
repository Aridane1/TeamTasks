import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";

import taskRouter from "./routes/task.routes";
import userRouter from "./routes/user.routes";
import verifyToken from "./middlewares/verifyToken.middleware";

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

export default app;
