import { Router } from "express";
import {
  addTaskNotification,
  deleteOneTaskNotification,
  getAllTaskNotifications,
  getOneTaskNotification,
  putOneTaskNotification,
} from "../controllers/taskNotification.controller";

const router = Router();

router.post("/", addTaskNotification);
router.get("/:id", getOneTaskNotification);
router.get("/", getAllTaskNotifications);
router.delete("/:id", deleteOneTaskNotification);
router.put("/:id", putOneTaskNotification);

export default router;