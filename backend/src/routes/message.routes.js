import { Router } from "express";
import {
  addManyMessage,
  addMessage,
  getAllMessagesForUser,
} from "../controllers/comment.controller";
const router = Router();

router.post("/add-many", addManyMessage);
router.post("/", addMessage);
router.get("/", getAllMessagesForUser);

export default router;
