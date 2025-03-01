import Student from "../models/Student";

// Create a Student
export const createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ msg: "Student saved successfully", student });
  } catch (err) {
    res.status(401).json({ msg: "Error creating student" });
  }
};

//Get all Students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ msg: "Server Error ", err });
  }
};

//Get Student By Id
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ msg: "Student not found" });
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ msg: "Server Error ", err });
  }
};

//Update Student
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id);
    if (!student) return res.status(404).json({ msg: "Student not Found" });
    res.status(200).json({ msg: "Student successfully updated" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error ", err });
  }
};

//Delete Student
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ msg: "Student not found" });
    res.status(200).json({ msg: "Student successfully deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error", err });
  }
};
