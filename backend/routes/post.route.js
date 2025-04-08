import express from "express";
import {
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost
} from "../controllers/post.controller.js"; 
import authMiddleware from "../middleware/authMiddleware.js";

const Router = express.Router();

Router.use(authMiddleware);

Router.post("/", createPost);

Router.get("/", getPost);

Router.put("/:id", updatePost);


Router.delete("/:id", deletePost);

Router.post("/:id/like", likePost); 
Router.post("/:id/unlike", unlikePost); 
export default Router;
