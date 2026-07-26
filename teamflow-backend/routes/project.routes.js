import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectMembers,
  addProjectMembers,
  removeProjectMembers,
} from "../controllers/project.controller.js";
import { authHandler } from "../middleware/authHandler.js";

const router = express.Router();

router.post("/", authHandler, createProject);
router.get("/", authHandler, getProjects);
router.get("/:id", authHandler, getProjectById);
router.put("/:id", authHandler, updateProject);
router.delete("/:id", authHandler, deleteProject);

router.get("/:projectId/members", authHandler, getProjectMembers);
router.post("/:projectId/members", authHandler, addProjectMembers);
router.put("/:projectId/members", authHandler, removeProjectMembers);

export default router;
