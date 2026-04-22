import mongoose from "mongoose";
const lessonSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  textContent: String
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, default: 0 },
    category: { type: String },
        studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        image: { type: String },
    previewVideo: { type: String },
        image: {
  type: String,
  default: "https://source.unsplash.com/400x300/?education"
    },
        instructor: {
  type: String,
  default: "John Doe"
},
rating: {
  type: Number,
  default: 4.5
},
category: {
  type: String,
  default: "Development"
},
    content: [ // Array of lessons
    {
      title: String,
      videoUrl: String,
      textContent: String
    }
  ]    // store image path
    },
  
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
