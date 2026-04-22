import express from "express";
import Course from "../models/Course.mjs";
import { protect } from "../middleware/auth.mjs";
import { adminOnly } from "../middleware/admin.mjs";
import { upload } from "../middleware/upload.mjs";
import Enrollment from "../models/Enrollment.mjs";
import User from "../models/User.mjs";

const router = express.Router();

/**
 * PUBLIC ROUTES
 */

// Public - Get all courses (only preview data)
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().select("title description price image previewVideo");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * ADMIN ROUTES
 */

// Admin - Create course with image
router.post("/", protect, adminOnly, upload.single("image"), async (req, res) => {
  try {
    const { title, description, price, previewVideo, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const course = new Course({ title, description, price, image, previewVideo, content });
    await course.save();

    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin - Update course with image
router.put("/:id", protect, adminOnly, upload.single("image"), async (req, res) => {
  try {
    const updateData = req.body;
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }
    const course = await Course.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin - Delete course
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * STUDENT / PROTECTED ROUTES
 */

// Get course content - if not enrolled, only preview
router.get("/:id/content", protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const isEnrolled = await Enrollment.findOne({
      user: req.user.id,
      course: course._id
    });

    if (!isEnrolled) {
      return res.json({
        previewVideo: course.previewVideo,
        message: "Enroll to access full content"
      });
    }

    res.json(course.content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Enroll in a course
router.post("/:id/enroll", protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const alreadyEnrolled = await Enrollment.findOne({
      user: req.user.id,
      course: course._id
    });

    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    await Enrollment.create({ user: req.user.id, course: course._id });
    res.json({ message: "Enrolled successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
