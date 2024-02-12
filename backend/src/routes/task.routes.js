import { Router } from "express";
import {
  addTask,
  addTaskWithPhoto,
  deleteOneTask,
  getAllTasks,
  getOneTask,
  putOneTask,
} from "../controllers/task.controller";
import { multerUltis } from "../middlewares/multerUtlis.middleware";

const router = Router();

router.post("/", addTask);
router.post("/taskPhoto", multerUltis.single("file"), addTaskWithPhoto);
router.get("/:id", getOneTask);
router.get("/", getAllTasks);
router.delete("/:id", deleteOneTask);
router.put("/:id", putOneTask);

export default router;
