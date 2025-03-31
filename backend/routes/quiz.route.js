import express from "express";
import { generateQuiz, getRoadmap } from "../AI/gemini.js";

const Router = express.Router();

Router.post("/quiz", generateQuiz);

Router.post("/roadmap", getRoadmap);

export default Router;
