import Fee from "../models/Fee.js";
import Student from "../models/Student.js";

//Create a Few Record
export const createFeeRecord = async (req, res, next) => {
  try {
    const { studentId, totalAmount } = req.body;

    //check if student exists
    const student = Student.findById(studentId);
    if (!student) return res.status(400).json({ msg: "Student not Found" });

    const fee = new Fee({
      studentId,
      totalAmount,
      dueAmount: totalAmount,
    });

    await fee.save();
    res.status(201).json({ msg: "Fee record created", fee });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

// Get All Fee Records
export const getAllFees = async (req, res) => {
  try {
    const fees = await Fee.find().populate("studentId", "name grade");
    res.status(200).json(fees);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

// Get Fee Record by Student ID
export const getFeeByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const fee = await Fee.findOne({ studentId }).populate(
      "studentId",
      "name grade"
    );

    if (!fee) return res.status(404).json({ msg: "Fee record not found" });

    res.status(200).json(fee);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

// Update Fee Record
export const updateFeeRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { totalAmount } = req.body;

    const fee = await Fee.findByIdAndUpdate(id, { totalAmount }, { new: true });
    if (!fee) return res.status(404).json({ msg: "Fee record not found" });

    res.status(200).json({ msg: "Fee record updated", fee });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

// Process Payment
export const processPayment = async (req, res) => {
  try {
    const { studentId, amount, method } = req.body;

    // Find Fee Record
    const fee = await Fee.findOne({ studentId });
    if (!fee) return res.status(404).json({ msg: "Fee record not found" });

    // Update Paid & Due Amount
    fee.paidAmount += amount;
    fee.dueAmount = fee.totalAmount - fee.paidAmount;
    fee.transactions.push({ amount, method });

    // Update Fee Status
    if (fee.dueAmount === 0) {
      fee.status = "Paid";
    }

    await fee.save();
    res.status(200).json({ msg: "Payment processed successfully", fee });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

// Delete Fee Record
export const deleteFeeRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const fee = await Fee.findByIdAndDelete(id);
    if (!fee) return res.status(404).json({ msg: "Fee record not found" });

    res.status(200).json({ msg: "Fee record deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};
