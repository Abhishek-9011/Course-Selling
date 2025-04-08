import express from "express";
import mongoose from "mongoose";
import Post from "../models/post.model.js";

const router = express.Router();

// Create a new post
export const createPost = async (req, res) => {
  try {
    const author = req.user.id; // Assuming middleware adds `user` to `req`
    const { title, content } = req.body;
    const post = new Post({
      title,
      content,
      author,
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all posts
export const getPost = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming middleware adds `user` to `req`
    const posts = await Post.find({ author: userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a post by ID
export const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like a post
export const likePost = async (req, res) => {
  try {
    const postId = req.params.id; // Post ID from URL params
    const userId = req.user.id; // User ID from middleware

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user has already liked the post
    if (post.likes.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already liked this post" });
    }

    // Add the user's ID to the likes array
    post.likes.push(userId);
    await post.save();

    res.status(200).json({ message: "Post liked successfully", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Unlike a post
export const unlikePost = async (req, res) => {
  try {
    const postId = req.params.id; // Post ID from URL params
    const userId = req.user.id; // User ID from middleware

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user has liked the post
    if (!post.likes.includes(userId)) {
      return res.status(400).json({ message: "You have not liked this post" });
    }

    // Remove the user's ID from the likes array
    post.likes = post.likes.filter((id) => id.toString() !== userId);
    await post.save();

    res.status(200).json({ message: "Post unliked successfully", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 