import Grade from "../models/Grade.js";
import Student from "../models/Student.js";

// Add Grade
export const addGrade = async (req, res) => {
  try {
    const { studentId, subject, grade, semester, remarks } = req.body;

    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ msg: "Student not found" });

    const newGrade = new Grade({
      studentId,
      subject,
      grade,
      semester,
      remarks,
    });
    await newGrade.save();

    res.status(201).json({ msg: "Grade added successfully", newGrade });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

// Get All Grades
export const getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.find().populate("studentId", "name grade");
    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

// Get Grades by Student ID
export const getGradesByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const grades = await Grade.find({ studentId }).populate(
      "studentId",
      "name grade"
    );

    if (!grades.length)
      return res.status(404).json({ msg: "No grades found for this student" });

    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

// Update Grade
export const updateGrade = async (req, res) => {
  try {
    const { id } = req.params;
    const { grade, remarks } = req.body;

    const updatedGrade = await Grade.findByIdAndUpdate(
      id,
      { grade, remarks },
      { new: true }
    );
    if (!updatedGrade)
      return res.status(404).json({ msg: "Grade record not found" });

    res.status(200).json({ msg: "Grade updated successfully", updatedGrade });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

// Delete Grade
export const deleteGrade = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedGrade = await Grade.findByIdAndDelete(id);
    if (!deletedGrade)
      return res.status(404).json({ msg: "Grade record not found" });

    res.status(200).json({ msg: "Grade record deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};
