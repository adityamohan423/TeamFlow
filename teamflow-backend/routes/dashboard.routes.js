import express from "express";
import { getDashboard } from "../controllers/dashboard.controller.js";
import { authHandler } from "../middleware/authHandler.js";

const router = express.Router();

router.get("/", authHandler, getDashboard);

export default router;
