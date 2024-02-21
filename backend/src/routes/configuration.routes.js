import { Router } from "express";
import {
  addConfiguration,
  deleteConfigurationForUser,
  getConfigurationForUser,
  putConfigurationForUser,
  putConfigurationForUserPhoto,
} from "../controllers/configuration.controller";
import { multerUltis } from "../middlewares/multerUtlis.middleware";

const router = Router();

router.put("/noPhoto/:userId", putConfigurationForUser);
router.put(
  "/:userId",
  multerUltis.single("file"),
  putConfigurationForUserPhoto
);
router.post("/", addConfiguration);
router.get("/:userId", getConfigurationForUser);
router.delete("/:userId", deleteConfigurationForUser);

export default router;
