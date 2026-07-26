import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { userLogin } from "../controllers/login.controller.js";

const router = express.Router();

router.post("/", asyncHandler(userLogin));

export default router;
