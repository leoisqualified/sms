import express from "express";
import { register, login, protect } from "../controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/protected", protect, (req, res) => {
  res.json({ msg: "Access granted", user: req.user });
});

// Export routes
export default router;
