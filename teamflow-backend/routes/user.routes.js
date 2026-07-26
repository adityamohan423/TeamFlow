import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import golbalErrorHandler from "../middleware/golbalErrorHandler.js";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { authHandler } from "../middleware/authHandler.js";
import { adminOnly } from "../middleware/adminonly.js";

const router = express.Router();

// Create a user
router.post("/", asyncHandler(createUser));

//Get all users
router.get(
  "/",
  asyncHandler(authHandler),
  asyncHandler(adminOnly),
  asyncHandler(getUsers),
);

// Get one userById
router.get("/:id", asyncHandler(authHandler), asyncHandler(getUser));

// Update user
router.put("/:id", asyncHandler(authHandler), asyncHandler(updateUser));

// Delete user
router.delete("/:id", asyncHandler(authHandler), asyncHandler(deleteUser));

router.use(golbalErrorHandler);

export default router;
