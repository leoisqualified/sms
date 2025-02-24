import React from "react";
import AssignmentForm from "./AssigmentForm";

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "/login";
};
const TeacherDashboard = () => {
  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <AssignmentForm />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default TeacherDashboard;
