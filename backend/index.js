import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import DBConnect from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import feeRoutes from "./routes/feeRoutes.js";
import gradeRoutes from "./routes/gradeRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import examResultRoutes from "./routes/examResultRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";

const app = express();

dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
DBConnect();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/results", examResultRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/student-portal", studentPortalRoutes);

// Server Listening
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
