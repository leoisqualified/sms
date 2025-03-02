import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StudentPortal.css";

const StudentPortal = () => {
  const [studentData, setStudentData] = useState(null);
  const studentId = "65f0a1b9c12345678"; // Replace with logged-in student's ID

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/student-portal/${studentId}`
        );
        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching student data", error);
      }
    };

    fetchStudentData();
  }, [studentId]);

  if (!studentData) return <p>Loading...</p>;

  return (
    <div className="student-portal">
      <h2>Welcome, {studentData.student.name}</h2>

      <div className="section">
        <h3>Attendance</h3>
        <ul>
          {studentData.attendanceRecords.map((record, index) => (
            <li key={index}>
              {record.date}: {record.status}
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h3>Fees</h3>
        <ul>
          {studentData.feeRecords.map((fee, index) => (
            <li key={index}>
              ${fee.amount} - {fee.status}
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h3>Grades</h3>
        <ul>
          {studentData.grades.map((grade, index) => (
            <li key={index}>
              {grade.subject}: {grade.score}
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h3>Exam Results</h3>
        <ul>
          {studentData.examResults.map((result, index) => (
            <li key={index}>
              {result.examId.examName} ({result.examId.subject}):{" "}
              {result.obtainedMarks} ({result.status})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentPortal;
