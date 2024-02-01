import { Router } from "express";
import {
  addDevice,
  deleteDeviceById,
  getDevicesByUser,
  putDevice,
} from "../controllers/device.controller";

const router = Router();

router.post("/", addDevice);
router.get("/:userId", getDevicesByUser);
router.delete("/:id", deleteDeviceById);
router.put("/:id", putDevice);

export default router;
