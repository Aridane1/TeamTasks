import { Router } from "express";
import {
  addUserTask,
  deleteOneUserTask,
  getAllUserTask,
  getOneUserTask,
  putOneUserTask,
} from "../controllers/userTask.controller";

const router = Router();

router.post("/", addUserTask);
router.get("/:id", getOneUserTask);
router.get("/", getAllUserTask);
router.delete("/:id", deleteOneUserTask);
router.put("/:id", putOneUserTask);

export default router;