import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Grades.css";

const Grades = () => {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchGrades = async () => {
      const response = await axios.get("http://localhost:5000/api/grades");
      setGrades(response.data);
    };
    fetchGrades();
  }, []);

  return (
    <div className="grades-container">
      <h2>Student Grades</h2>
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Student</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => (
            <tr key={grade._id}>
              <td>{grade.subject}</td>
              <td>{grade.studentName}</td>
              <td>{grade.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grades;
