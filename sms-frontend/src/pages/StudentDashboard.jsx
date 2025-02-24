import React from "react";
import SubmissionForm from "./SubmissionForm";

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "/login";
};
const StudentDashboard = () => {
  return (
    <div>
      <h2>Student Dashboard</h2>
      <SubmissionForm />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default StudentDashboard;
