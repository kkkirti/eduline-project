// routes/enrollmentRoutes.mjs
import express from "express";
import Enrollment from "../models/Enrollment.mjs";
import Course from "../models/Course.mjs";
import { protect } from "../middleware/auth.mjs";

const router = express.Router();

/**
 * @route   POST /api/enrollments/:courseId
 * @desc    Enroll logged-in user in a course
 * @access  Private
 */
router.post("/:courseId", protect, async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if already enrolled
    const existing = await Enrollment.findOne({
      user: req.user.id,
      course: courseId
    });
    if (existing) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    // Enroll
    const enrollment = await Enrollment.create({
      user: req.user.id,
      course: courseId
    });

    res.status(201).json({
      success: true,
      message: "Enrolled successfully",
      enrollment
    });
  } catch (err) {
    console.error("Enrollment error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   GET /api/enrollments/my
 * @desc    Get all courses the user is enrolled in
 * @access  Private
 */
router.get("/my", protect, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user.id })
      .populate("course");

    res.json({
      success: true,
      count: enrollments.length,
      courses: enrollments
    });
  } catch (err) {
    console.error("Fetch enrollments error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
