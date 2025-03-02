import Exam from "../models/Exam.js";
import Student from "../models/Student.js";

// Create Exam
export const createExam = async (req, res) => {
  try {
    const { examName, subject, date, totalMarks, assignedStudents } = req.body;

    // Verify students exist
    const students = await Student.find({ _id: { $in: assignedStudents } });
    if (students.length !== assignedStudents.length) {
      return res.status(400).json({ msg: "Some student IDs are invalid" });
    }

    const newExam = new Exam({
      examName,
      subject,
      date,
      totalMarks,
      assignedStudents,
    });
    await newExam.save();

    res.status(201).json({ msg: "Exam scheduled successfully", newExam });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

// Get All Exams
export const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate("assignedStudents", "name grade");
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

// Get Exam by ID
export const getExamById = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findById(id).populate(
      "assignedStudents",
      "name grade"
    );

    if (!exam) return res.status(404).json({ msg: "Exam not found" });

    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

// Update Exam
export const updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const { examName, subject, date, totalMarks, assignedStudents } = req.body;

    const updatedExam = await Exam.findByIdAndUpdate(
      id,
      { examName, subject, date, totalMarks, assignedStudents },
      { new: true }
    );

    if (!updatedExam) return res.status(404).json({ msg: "Exam not found" });

    res.status(200).json({ msg: "Exam updated successfully", updatedExam });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

// Delete Exam
export const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedExam = await Exam.findByIdAndDelete(id);
    if (!deletedExam) return res.status(404).json({ msg: "Exam not found" });

    res.status(200).json({ msg: "Exam deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};
