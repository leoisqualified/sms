import mongoose from "mongoose";

const GradeSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    subject: { type: String, required: true },
    grade: { type: String, required: true }, // Example: A, B, C, D, F
    semester: { type: String, required: true }, // Example: "Fall 2024"
    remarks: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Grade", GradeSchema);
