import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./styles/styles.css";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // Store role in localStorage during login

  return (
    <Router>
      <div className="container">
        <h1>School Management System</h1>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/teacher"
            element={
              isAuthenticated && userRole === "teacher" ? (
                <TeacherDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/student"
            element={
              isAuthenticated && userRole === "student" ? (
                <StudentDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
