import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    studentId: { type: String, required: true },
    grade: { type: String, required: true },
    guardian: {
      name: { type: String, required: true },
      contact: { type: String, required: true },
    },
    dob: { type: Date, required: true },
    address: { type: String, required: true },
    attendance: [
      {
        date: { type: Date, default: Date.now },
        status: {
          type: String,
          enum: ["Present", "Absent", "Late"],
          default: "Present",
        },
      },
    ],
    fees: {
      totalAmount: { type: Number, default: 0 },
      paidAmount: { type: Number, default: 0 },
      dueAmount: { type: Number, default: 0 },
      status: { type: String, enum: ["Paid", "Pending"], default: "Pending" },
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
