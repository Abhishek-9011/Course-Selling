import mongoose from "mongoose";
const { Schema } = mongoose;
const postSchema = new Schema({
  title: {
    type: String,
    required: [true, "Post title is required"],
    trim: true,
    maxlength: [200, "Title cannot exceed 200 characters"],
  },
  content: {
    type: String,
    required: [true, "Post content is required"],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Post author is required"],
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
const Post = mongoose.model("post", postSchema);
export default Post;