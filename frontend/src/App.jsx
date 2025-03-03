import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Attendance from "./pages/Attendance";
import Grades from "./pages/Grades";
import Fees from "./pages/Fees";
import Exams from "./pages/Exams";
import Messages from "./pages/Messages";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/fees" element={<Fees />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
