import express from "express";
import { getStudentDashboard } from "../controllers/studentPortalController.js";

const router = express.Router();

// Get student dashboard data
router.get("/:studentId", getStudentDashboard);

export default router;
