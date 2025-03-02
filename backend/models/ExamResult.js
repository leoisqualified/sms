import mongoose from "mongoose";

const ExamResultSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    obtainedMarks: { type: Number, required: true },
    status: { type: String, enum: ["Pass", "Fail"], required: true },
  },
  { timestamps: true }
);

export default mongoose.model("ExamResult", ExamResultSchema);
