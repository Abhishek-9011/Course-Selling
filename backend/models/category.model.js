import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Category description is required"],
  },
  slug: {
    type: String,
    unique: true,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;
