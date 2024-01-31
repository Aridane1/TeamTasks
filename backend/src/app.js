import express from "express";
import morgan from "morgan";
import cors from "cors";
import taskRouter from "./routes/task.routes";
import userRouter from "./routes/user.routes";

const app = express();

let corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan("dev"));

app.use("/api/task", taskRouter);
app.use("/api/user", userRouter);

export default app;
