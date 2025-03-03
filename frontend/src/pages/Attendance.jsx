import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Attendance.css";

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      const response = await axios.get("http://localhost:5000/api/attendance");
      setAttendanceRecords(response.data);
    };
    fetchAttendance();
  }, []);

  return (
    <div className="attendance-container">
      <h2>Attendance Records</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Student</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record) => (
            <tr key={record._id}>
              <td>{record.date}</td>
              <td>{record.studentName}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
