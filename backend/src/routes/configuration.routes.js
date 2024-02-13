import { Router } from "express";
import {
  addConfiguration,
  deleteConfigurationForUser,
  getConfigurationForUser,
  putConfigurationForUser,
  addConfigurationWithPhoto
} from "../controllers/configuration.controller";
import { multerUltis } from "../middlewares/multerUtlis.middleware";
const router = Router();

router.post("/", addConfiguration);
router.get("/:userId", getConfigurationForUser);
router.delete("/:userId", deleteConfigurationForUser);
router.put("/:userId", putConfigurationForUser);
router.post("/configurationPhoto", multerUltis.single("file"), addConfigurationWithPhoto);

export default router;
