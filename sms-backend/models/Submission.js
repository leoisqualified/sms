import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  answers: { type: [String] }, // For MCQ
  essay: { type: String }, // For Essay
  score: { type: Number, default: 0 },
  feedback: { type: String },
});

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;
