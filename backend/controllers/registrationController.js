import Registration from "../models/Registration.js";

// Submit New Registration
export const submitRegistration = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      dateOfBirth,
      address,
      guardianName,
      guardianPhone,
      previousSchool,
      documents,
    } = req.body;

    const newRegistration = new Registration({
      fullName,
      email,
      phone,
      dateOfBirth,
      address,
      guardianName,
      guardianPhone,
      previousSchool,
      documents,
    });

    await newRegistration.save();
    res
      .status(201)
      .json({ msg: "Registration submitted successfully", newRegistration });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

// Get All Registrations (Admin)
export const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

// Get Registration by ID
export const getRegistrationById = async (req, res) => {
  try {
    const { id } = req.params;
    const registration = await Registration.findById(id);

    if (!registration)
      return res.status(404).json({ msg: "Registration not found" });

    res.status(200).json(registration);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

// Approve/Reject Registration
export const updateRegistrationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminRemarks } = req.body;

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status" });
    }

    const updatedRegistration = await Registration.findByIdAndUpdate(
      id,
      { status, adminRemarks },
      { new: true }
    );

    if (!updatedRegistration)
      return res.status(404).json({ msg: "Registration not found" });

    res.status(200).json({ msg: "Registration updated", updatedRegistration });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

// Delete Registration (Admin)
export const deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRegistration = await Registration.findByIdAndDelete(id);
    if (!deletedRegistration)
      return res.status(404).json({ msg: "Registration not found" });

    res.status(200).json({ msg: "Registration deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};
