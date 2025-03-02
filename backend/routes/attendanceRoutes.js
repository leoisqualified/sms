import express from "express";
import {
  markAttendance,
  getAllAttendance,
  getAttendanceByStudent,
  updateAttendance,
  deleteAttendance,
} from "../controllers/attendanceController.js";

const router = express.Router();

// Attendance Routes
router.post("/", markAttendance);
router.get("/", getAllAttendance);
router.get("/:studentId", getAttendanceByStudent);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

export default router;
