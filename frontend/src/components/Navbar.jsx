import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>School Management System</h2>
      <ul>
        <li>
          <Link to="/attendance">Attendance</Link>
        </li>
        <li>
          <Link to="/grades">Grades</Link>
        </li>
        <li>
          <Link to="/fees">Fees</Link>
        </li>
        <li>
          <Link to="/exams">Exams</Link>
        </li>
        <li>
          <Link to="/messages">Messages</Link>
        </li>
        <li>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
