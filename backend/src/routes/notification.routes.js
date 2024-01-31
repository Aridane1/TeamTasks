import { Router } from "express";
import {
  addNotification,
  deleteOneNotification,
  getAllNotifications,
  getOneNotification,
  putOneNotification,
} from "../controllers/notification.controller";

const router = Router();

router.post("/", addNotification);
router.get("/:id", getOneNotification);
router.get("/", getAllNotifications);
router.delete("/:id", deleteOneNotification);
router.put("/:id", putOneNotification);

export default router;