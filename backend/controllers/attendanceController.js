import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";

export const markAttendance = async (req, res) => {
  try {
    const { studentId, status } = req.body;

    //Check if student exists
    const student = Student.findById(studentId);
    if (!student) return res.status(400).json({ msg: "Student not found" });

    const attendance = new Attendance({ studentId, status });
    await attendance.save();

    res.status(200).json({ msg: "Attendance Marked Successfully", attendance });
  } catch (err) {
    res.status(500).json({ msg: "Server Error", err });
  }
};

// Get Attendance by Student ID
export const getAttendanceByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const records = await Attendance.find({ studentId }).sort({ date: -1 });

    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ msg: "Server Error", err });
  }
};

// Get All Attendance Records
export const getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find().populate("studentId", "name grade");
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

// Update an Attendance Record
export const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const record = await Attendance.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!record) return res.status(200).json({ msg: "Record not found" });
    res.status(200).json({ msg: "Attendance Updated", record });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//Delete an Attendance Record
export const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const record = Attendance.findByIdAndDelete(id);
    if (!record) return res.status(404).json({ msg: "Attendance Not Found" });

    res.status(200).json({ msg: "Attendance Successfully Deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
