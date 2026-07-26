import express from "express";
import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import { authHandler } from "../middleware/authHandler.js";

const router = express.Router();

router.post("/", authHandler, createComment);
router.get("/", authHandler, getComments);
router.put("/:id", authHandler, updateComment);
router.delete("/:id", authHandler, deleteComment);

export default router;
