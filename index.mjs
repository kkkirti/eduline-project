import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import courseRoutes from "./routes/courseRoutes.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import enrollmentRoutes from "./routes/enrollmentRoutes.mjs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

dotenv.config();

// Connect to DB
connectDB();

const app = express();
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
