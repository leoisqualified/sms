import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import DBConnect from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

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

// Server Listening
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
