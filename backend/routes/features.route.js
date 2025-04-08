import express from "express";
import { generateQuiz, getRoadmap, generateTimetable } from "../AI/gemini.js";

const Router = express.Router();

Router.post("/quiz", generateQuiz);

Router.post("/roadmap", getRoadmap);

Router.post("/timetable", generateTimetable);


export default Router;
