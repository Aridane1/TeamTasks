import { Router } from "express";
import {
  addComment,
  deleteCommentById,
  getAllCommentByTaskId,
  putCommentById,
} from "../controllers/comment.controller";
const router = Router();

router.post("/", addComment);
router.get("/:taskId", getAllCommentByTaskId);
router.delete("/:id", deleteCommentById);
router.put("/:id", putCommentById);

export default router;
