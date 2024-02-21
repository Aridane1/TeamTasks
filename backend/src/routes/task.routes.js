import { Router } from "express";
import {
  addTaskWithPhoto,
  deleteOneTask,
  getAllTasks,
  getAllTasksExpireInFiveDay,
  getOneTask,
  putOneTask,
} from "../controllers/task.controller";
import { multerUltis } from "../middlewares/multerUtlis.middleware";

const router = Router();

router.post("/taskPhoto", multerUltis.single("file"), addTaskWithPhoto);
router.get("/:id", getOneTask);
router.get("/", getAllTasks);
router.delete("/:id", deleteOneTask);
router.put("/:id", putOneTask);

export default router;
