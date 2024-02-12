import { Router } from "express";
import {
  addConfiguration,
  deleteConfigurationForUser,
  getConfigurationForUser,
  putConfigurationForUser,
} from "../controllers/configuration.controller";
const router = Router();

router.post("/", addConfiguration);
router.get("/:userId", getConfigurationForUser);
router.delete("/:userId", deleteConfigurationForUser);
router.put("/:userId", putConfigurationForUser);

export default router;
