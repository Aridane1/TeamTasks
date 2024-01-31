import { Router } from "express";
import {
  addTask,
  deleteOneTask,
  getAllTasks,
  getOneTask,
  putOneTask,
} from "../controllers/task.controller";

const router = Router();

router.post("/", addTask);
router.get("/:id", getOneTask);
router.get("/", getAllTasks);
router.delete("/:id", deleteOneTask);
router.put("/:id", putOneTask);

export default router;
