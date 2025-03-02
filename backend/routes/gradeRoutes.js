import express from "express";
import {
  addGrade,
  getAllGrades,
  getGradesByStudent,
  updateGrade,
  deleteGrade,
} from "../controllers/gradeController.js";

const router = express.Router();

// Grade Routes
router.post("/", addGrade);
router.get("/", getAllGrades);
router.get("/:studentId", getGradesByStudent);
router.put("/:id", updateGrade);
router.delete("/:id", deleteGrade);

export default router;
