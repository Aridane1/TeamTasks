import { Router } from "express";
import {
  addCollaborator,
  deleteOneCollaborator,
  getAllCollaborator,
  getOneCollaborator,
  putOneCollaborator,
  getCollaboratorsImagesByTaskId
} from "../controllers/collaborator.controller";

const router = Router();

router.post("/", addCollaborator);
router.get("/:id", getOneCollaborator);
router.get("/", getAllCollaborator);
router.delete("/:id", deleteOneCollaborator);
router.put("/:id", putOneCollaborator);
router.get("/collaboratorPhoto/:id", getCollaboratorsImagesByTaskId);

export default router;