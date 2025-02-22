import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  questions: [
    {
      type: { type: String, enum: ["MCQ", "Essay"], required: true },
      question: { type: String, required: true },
      options: { type: [String] }, // For MCQ
      correctAnswer: { type: String }, // For MCQ
      rubric: {
        // For Essay
        grammar: { type: Number, default: 0 },
        relevance: { type: Number, default: 0 },
        creativity: { type: Number, default: 0 },
      },
      marks: { type: Number, required: true },
    },
  ],
});

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;
