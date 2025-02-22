import express from "express";
import {
  submitAssignment,
  getSubmissions,
} from "../controllers/submissionController.js";

const router = express.Router();

router.post("/", submitAssignment);
router.get("/:assignmentId", getSubmissions);

export default router;
