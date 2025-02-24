import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/authHelpers.js";
import jwtManager from "../utils/jwtManager.js";

// Register a new user
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    // Generate token
    const token = jwtManager(user);

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    // Compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    // Generate token
    const token = jwtManager(user);

    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
