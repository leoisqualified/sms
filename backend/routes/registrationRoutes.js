import express from "express";
import {
  submitRegistration,
  getAllRegistrations,
  getRegistrationById,
  updateRegistrationStatus,
  deleteRegistration,
} from "../controllers/registrationController.js";

const router = express.Router();

// Student submits registration
router.post("/", submitRegistration);

// Admin operations
router.get("/", getAllRegistrations);
router.get("/:id", getRegistrationById);
router.put("/:id", updateRegistrationStatus);
router.delete("/:id", deleteRegistration);

export default router;
