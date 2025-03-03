import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Exams.css";

const Exams = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      const response = await axios.get("http://localhost:5000/api/exams");
      setExams(response.data);
    };
    fetchExams();
  }, []);

  return (
    <div className="exams-container">
      <h2>Upcoming Exams</h2>
      <ul>
        {exams.map((exam) => (
          <li key={exam._id}>
            {exam.subject} - {exam.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Exams;
