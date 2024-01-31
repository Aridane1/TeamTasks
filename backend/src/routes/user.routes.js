import { Router } from "express";
import {
  addUser,
  deleteOneUser,
  getAllUsers,
  putUser,
} from "../controllers/user.controller";
import {
  isAuthenticated,
  signin,
} from "../middlewares/authentication.middleware";

const router = Router();

router.post("/", addUser);
router.get("/", getAllUsers);
router.delete("/:email", isAuthenticated, deleteOneUser);
router.put("/:email", putUser);
router.post("/signin", signin);

export default router;
