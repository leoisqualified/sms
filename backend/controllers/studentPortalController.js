import Student from "../models/Student.js";
import Attendance from "../models/Attendance.js";
import Fee from "../models/Fee.js";
import Grade from "../models/Grade.js";
import ExamResult from "../models/ExamResult.js";

// Get Student Dashboard Data
export const getStudentDashboard = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Fetch student details
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ msg: "Student not found" });

    // Fetch attendance
    const attendanceRecords = await Attendance.find({ studentId });

    // Fetch fee records
    const feeRecords = await Fee.find({ studentId });

    // Fetch grades
    const grades = await Grade.find({ studentId });

    // Fetch exam results
    const examResults = await ExamResult.find({ studentId }).populate(
      "examId",
      "examName subject"
    );

    // Return student data
    res.status(200).json({
      student,
      attendanceRecords,
      feeRecords,
      grades,
      examResults,
    });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};
