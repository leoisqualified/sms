import OpenAI from "openai";
import Submission from "../models/Submission.js";
import Assignment from "../models/Assignment.js";

//Initialize the OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Add your OpenAI API key to .env
});

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

    // AI Grading for Essay
    if (essay) {
      const prompt = `Evaluate this essay based on the following rubric:
      - Grammar: 40%
      - Relevance: 40%
      - Creativity: 20%
      
      Essay: ${essay}
      
      Provide a score out of 10 and feedback.`;

      const aiResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 100,
      });

      const aiFeedback = aiResponse.choices[0].message.content;
      const aiScore = parseFloat(aiFeedback.match(/\d+/)[0]); // Extract score from feedback
      score += aiScore; // Add AI score to total score
    }

    //Save Submission
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
