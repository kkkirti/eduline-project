import express from "express";
import { protect } from "../middleware/auth.mjs";
import { admin } from "../middleware/admin.mjs";
import Course from "../models/Course.mjs";

const router = express.Router();

// Admin: Create a course
router.post("/", protect, admin, async (req, res) => {
  try {
    const { title, description, price, image, previewVideo, content } = req.body;

    const newCourse = new Course({
      title,
      description,
      price,
      image,
      previewVideo,
      content // array of lessons [{ title, videoUrl, textContent }]
    });

    await newCourse.save();
    res.status(201).json({ message: "Course created successfully", course: newCourse });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
