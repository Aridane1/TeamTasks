import { Router } from "express";
import {
  addTag,
  deleteOneTag,
  getAllTags,
  getOneTag,
  putOneTag,
} from "../controllers/tag.controller";

const router = Router();

router.post("/", addTag);
router.get("/:id", getOneTag);
router.get("/", getAllTags);
router.delete("/:id", deleteOneTag);
router.put("/:id", putOneTag);

export default router;