import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { authHandler } from "../middleware/authHandler.js";

const router = express.Router();

router.post("/", authHandler, createTask);
router.get("/", authHandler, getTasks);
router.get("/:id", authHandler, getTaskById);
router.put("/:id", authHandler, updateTask);
router.delete("/:id", authHandler, deleteTask);

export default router;
