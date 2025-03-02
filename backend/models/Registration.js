import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    address: { type: String, required: true },
    guardianName: { type: String, required: true },
    guardianPhone: { type: String, required: true },
    previousSchool: { type: String },
    documents: [{ type: String }], // File paths of uploaded documents
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    adminRemarks: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Registration", RegistrationSchema);
