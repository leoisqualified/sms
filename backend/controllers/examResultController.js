import ExamResult from "../models/ExamResult.js";
import Exam from "../models/Exam.js";
import Student from "../models/Student.js";

// Add Exam Result
export const addExamResult = async (req, res) => {
  try {
    const { studentId, examId, obtainedMarks } = req.body;

    // Verify student & exam exist
    const student = await Student.findById(studentId);
    const exam = await Exam.findById(examId);

    if (!student || !exam)
      return res.status(404).json({ msg: "Student or Exam not found" });

    const status = obtainedMarks >= exam.totalMarks * 0.4 ? "Pass" : "Fail"; // 40% passing criteria

    const newResult = new ExamResult({
      studentId,
      examId,
      obtainedMarks,
      status,
    });
    await newResult.save();

    res.status(201).json({ msg: "Exam result recorded", newResult });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

// Get All Exam Results
export const getAllResults = async (req, res) => {
  try {
    const results = await ExamResult.find()
      .populate("studentId", "name grade")
      .populate("examId", "examName subject");
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

// Get Exam Results by Student ID
export const getResultsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const results = await ExamResult.find({ studentId }).populate(
      "examId",
      "examName subject"
    );

    if (!results.length)
      return res.status(404).json({ msg: "No results found for this student" });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

// Delete Exam Result
export const deleteExamResult = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedResult = await ExamResult.findByIdAndDelete(id);
    if (!deletedResult)
      return res.status(404).json({ msg: "Exam result not found" });

    res.status(200).json({ msg: "Exam result deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};
