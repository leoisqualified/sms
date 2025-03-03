import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Fees.css";

const Fees = () => {
  const [fees, setFees] = useState([]);

  useEffect(() => {
    const fetchFees = async () => {
      const response = await axios.get("http://localhost:5000/api/fees");
      setFees(response.data);
    };
    fetchFees();
  }, []);

  return (
    <div className="fees-container">
      <h2>Fee Payments</h2>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((fee) => (
            <tr key={fee._id}>
              <td>{fee.studentName}</td>
              <td>${fee.amount}</td>
              <td>{fee.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Fees;
