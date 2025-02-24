import React, { useState } from "react";
import axios from "axios";

const SubmissionForm = () => {
  const [assignmentId, setAssignmentId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [answers, setAnswers] = useState([]);
  const [essay, setEssay] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submission = { assignmentId, studentId, answers, essay };
    await axios.post("http://localhost:5000/api/submissions", submission);
    alert("Submission successful");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Assignment ID"
        value={assignmentId}
        onChange={(e) => setAssignmentId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <textarea
        placeholder="Essay"
        value={essay}
        onChange={(e) => setEssay(e.target.value)}
      />
      <button type="submit">Submit Assignment</button>
    </form>
  );
};

export default SubmissionForm;
