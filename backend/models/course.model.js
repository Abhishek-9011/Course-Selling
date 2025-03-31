import mongoose from "mongoose";
const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Course title is required"],
    trim: true,
    maxlength: [100, "Course title cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Course description is required"],
    maxlength: [2000, "Description cannot exceed 2000 characters"],
  },
  shortDescription: {
    type: String,
    required: [true, "Short description is required"],
    maxlength: [200, "Short description cannot exceed 200 characters"],
  },
  duration: {
    type: Number,
    required: [true, "Course duration is required"],
  },
  price: {
    type: Number,
    required: [true, "Course price is required"],
  },
  discountPrice: {
    type: Number,
  },
  isDiscounted: {
    type: Boolean,
    default: false,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Course instructor is required"],
  },
  thumbnail: {
    type: String,
    required: [true, "Course thumbnail is required"],
  },
  previewVideo: {
    type: String,
  },
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  requirements: [
    {
      type: String,
    },
  ],
  whatYouWillLearn: [
    {
      type: String,
    },
  ],
  totalLessons: {
    type: Number,
    default: 0,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  studentsEnrolled: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["draft", "pending", "published", "archived"],
    default: "draft",
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  publishedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model("Course", CourseSchema);
export default Course;
