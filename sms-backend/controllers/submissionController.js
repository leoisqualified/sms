import Submission from "../models/Submission.js";
import Assignment from "../models/Assignment.js";

// Submit an assignment
export const submitAssignment = async (req, res) => {
  try {
    const { assignmentId, studentId, answers, essay } = req.body;

    // Calculate score for MCQ answers
    const assignment = await Assignment.findById(assignmentId);
    let score = 0;
    if (assignment) {
      assignment.questions.forEach((question, index) => {
        if (
          question.type === "MCQ" &&
          question.correctAnswer === answers[index]
        ) {
          score += question.marks;
        }
      });
    }

    const submission = new Submission({
      assignmentId,
      studentId,
      answers,
      essay,
      score,
    });
    await submission.save();
    res.status(201).json(submission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all submissions for an assignment
export const getSubmissions = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const submissions = await Submission.find({ assignmentId });
    res.status(200).json(submissions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
