import { Router } from "express";
import {
  addTagTask,
  deleteOneTagTask,
  getAllTagTask,
  getOneTagTask,
  putOneTagTask,
} from "../controllers/tagTask.controller";

const router = Router();

router.post("/", addTagTask);
router.get("/:id", getOneTagTask);
router.get("/", getAllTagTask);
router.delete("/:id", deleteOneTagTask);
router.put("/:id", putOneTagTask);

export default router;