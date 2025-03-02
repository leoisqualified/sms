import express from "express";
import {
  createFeeRecord,
  getAllFees,
  getFeeByStudent,
  updateFeeRecord,
  processPayment,
  deleteFeeRecord,
} from "../controllers/feeController.js";

const router = express.Router();

// Fee Routes
router.post("/", createFeeRecord);
router.get("/", getAllFees);
router.get("/:studentId", getFeeByStudent);
router.put("/:id", updateFeeRecord);
router.post("/payment", processPayment);
router.delete("/:id", deleteFeeRecord);

export default router;
