import { Router } from "express";
import {
  addUser,
  deleteOneUser,
  getAllUsers,
  putUser,
} from "../controllers/user.controller";

const router = Router();

router.post("/", addUser);
router.get("/", getAllUsers);
router.delete("/:email", deleteOneUser);
router.put("/:email", putUser);

export default router;
