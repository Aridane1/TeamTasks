import { Router } from "express";
import {
  addFollower,
  deleteOneFollower,
  getAllFollowers,
  getOneFollower,
  putOneFollower,
  getFollowingsByFollowerId
} from "../controllers/followers.controller";

const router = Router();

router.post("/", addFollower);
router.get("/:id", getOneFollower);
router.get("/", getAllFollowers);
router.delete("/:id", deleteOneFollower);
router.put("/:id", putOneFollower);
router.get("/following/:id", getFollowingsByFollowerId);

export default router;