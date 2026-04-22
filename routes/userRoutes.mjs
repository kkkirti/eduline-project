// routes/userRoutes.mjs
import express from "express";
import { protect } from "../middleware/auth.mjs";
import User from "../models/User.mjs";

const router = express.Router();

// GET /api/user/profile (Protected)
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
