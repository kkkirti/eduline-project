import Enrollment from "../models/Enrollment.mjs";
import Course from "../models/Course.mjs";

// Enroll in a course
export const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const enrollment = new Enrollment({
      user: req.user.id,
      course: courseId
    });

    await enrollment.save();
    res.status(201).json({ message: "Enrolled successfully" });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }
    res.status(500).json({ message: error.message });
  }
};

// Get my enrolled courses
export const getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user.id }).populate("course");
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
