import { Router } from "express";
import { addManyMessage, addMessage } from "../controllers/comment.controller";
const router = Router();

router.post("/add-many", addManyMessage);
router.post("/", addMessage);

export default router;
