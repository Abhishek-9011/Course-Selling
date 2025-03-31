const SectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Section title is required"],
    trim: true,
  },
  description: {
    type: String,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
});

const Section = mongoose.model("Section", SectionSchema);
export default Section;