import express from "express";
import {
  createWorkspace,
  getWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
  getWorkSpaceMembers,
  addWorkSpaceMembers,
  removeWorkSpaceMembers,
} from "../controllers/workSpace.controller.js";
import { authHandler } from "../middleware/authHandler.js";
import { adminOnly } from "../middleware/adminOnly.js";

const router = express.Router();

router.post("/", authHandler, adminOnly, createWorkspace);
router.get("/", authHandler, getWorkspaces);
router.get("/:id", authHandler, getWorkspaceById);
router.put("/:id", authHandler, adminOnly, updateWorkspace);
router.delete("/:id", authHandler, adminOnly, deleteWorkspace);

router.get("/:workspaceId/members", authHandler, getWorkSpaceMembers); //all workspace members can access this route
router.post(
  "/:workspaceId/members",
  authHandler,
  adminOnly,
  addWorkSpaceMembers,
);
router.put(
  "/:workspaceId/members",
  authHandler,
  adminOnly,
  removeWorkSpaceMembers,
);

export default router;
