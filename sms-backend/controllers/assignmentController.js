import Assignment from "../models/Assignment.js";

// Create a new assignment
export const createAssignment = async (req, res) => {
  try {
    const { title, description, deadline, questions } = req.body;
    const assignment = new Assignment({
      title,
      description,
      deadline,
      questions,
    });
    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all assignments
export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
