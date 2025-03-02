import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema(
  {
    examName: { type: String, required: true }, // Example: Midterm, Final
    subject: { type: String, required: true },
    date: { type: Date, required: true },
    totalMarks: { type: Number, required: true },
    assignedStudents: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Exam", ExamSchema);
