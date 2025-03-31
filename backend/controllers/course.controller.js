import Course from "../models/course.model.js";

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const instructor = req.id; // This is defined but not used in the course creation
    const { title, description, shortDescription, duration, price, thumbnail } =
      req.body;
    const newCourse = new Course({
      title,
      description,
      shortDescription,
      duration,
      price,
      thumbnail,
      instructor, // Add the instructor ID to the course
    });
    const course = await newCourse.save(); // Save the newCourse instance, not Course
    res
      .status(201)
      .json({ success: true, message: "Course created successfully", course });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate(
      "instructor category sections reviews"
    );
    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "instructor category sections reviews"
    );
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a course
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Course updated successfully", course });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};