import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getRoadmap = async (req, res) => {
  try {
    // Get the user's interested field from the request body
    const { field } = req.body;

    if (!field) {
      return res
        .status(400)
        .json({ message: "Please provide a field of interest" });
    }

    const prompt = `Generate a comprehensive learning roadmap for someone interested in ${field}. 
      The roadmap should include:
      1. Key foundational concepts to learn first
      2. Intermediate topics to explore
      3. Advanced areas to master
      4. Recommended resources for each stage (books, courses, etc.)
      5. Approximate timeline for progression
      6. Potential career paths in this field
      
      Format the response as a JSON object with the following structure:
      {
        "field": "${field}",
        "overview": "Brief description of the field",
        "stages": [
          {
            "name": "Foundation",
            "description": "What this stage covers",
            "topics": ["Topic 1", "Topic 2", "Topic 3"],
            "resources": [
              {"type": "Book", "title": "Example Book", "description": "Short description"},
              {"type": "Course", "title": "Example Course", "description": "Short description"}
            ],
            "timeframe": "Estimated time to complete this stage",
            "milestones": ["Milestone 1", "Milestone 2"]
          },
          // Repeat for Intermediate and Advanced stages
        ],
        "careerPaths": [
          {"title": "Career Path 1", "description": "Description of this career option"}
        ]
      }
      
      Only return valid JSON without any explanations or markdown formatting.`;

    const result = await model.generateContent(prompt);
    const responseText =
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text;
    const jsonString = responseText.replace(/```json|```/g, "").trim();

    try {
      const responseJson = JSON.parse(jsonString);
      res.status(200).json(responseJson);
    } catch (error) {
      console.error("Failed to parse response as JSON:", error);
      res
        .status(500)
        .json({
          message: "Invalid AI response format",
          rawResponse: responseText,
        });
    }
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ message: error.message });
  }
};

export const generateQuiz = async (req, res) => {
  try {
    // Get the topic for the quiz from the request body
    const { topic } = req.body;

    if (!topic) {
      return res
        .status(400)
        .json({ message: "Please provide a topic for the quiz" });
    }

    const prompt = `Generate a quiz with 10 questions about ${topic}.
  
      The quiz should include a mix of question types:
      - Multiple choice questions (4 options each)
      - True/False questions
      - Short answer questions
      
      Format the response as a JSON object with the following structure:
      {
        "topic": "${topic}",
        "description": "Brief description of what this quiz covers",
        "difficulty": "Beginner/Intermediate/Advanced",
        "questions": [
          {
            "id": 1,
            "type": "multiple-choice",
            "question": "The question text goes here?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": "Option B",
            "explanation": "Brief explanation of why this is the correct answer"
          },
          {
            "id": 2,
            "type": "true-false",
            "question": "Is this statement true or false?",
            "correctAnswer": true,
            "explanation": "Brief explanation of why this is true/false"
          },
          {
            "id": 3,
            "type": "short-answer",
            "question": "Short answer question goes here?",
            "correctAnswer": "The correct answer",
            "explanation": "Brief explanation of the answer"
          }
          // Continue for all 10 questions
        ]
      }
      
      Ensure the questions are factually accurate, educational, and appropriate for someone learning about ${topic}.
      Only return valid JSON without any explanations or markdown formatting.`;

    const result = await model.generateContent(prompt);
    const responseText =
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text;
    const jsonString = responseText.replace(/```json|```/g, "").trim();

    try {
      const responseJson = JSON.parse(jsonString);
      res.status(200).json(responseJson);
    } catch (error) {
      console.error("Failed to parse response as JSON:", error);
      res
        .status(500)
        .json({
          message: "Invalid AI response format",
          rawResponse: responseText,
        });
    }
  } catch (error) {
    console.error("Error generating quiz:", error);
    res.status(500).json({ message: error.message });
  }
};

export const generateTimetable = async (req, res) => {
  try {
    // Get user preferences from the request body
    const {
      goals,
      wakeUpTime = "06:00",
      sleepTime = "22:00",
      workHours,
      studyTopics,
      exercisePreference,
      mealTimes,
      weekendDifferent = true,
      specificActivities = [],
    } = req.body;

    if (!goals) {
      return res
        .status(400)
        .json({ message: "Please provide your goals for the timetable" });
    }

    const prompt = `Generate a personalized weekly timetable for a user based on the following preferences:
      
      Goals: ${goals}
      Wake-up time: ${wakeUpTime}
      Sleep time: ${sleepTime}
      ${workHours ? `Work hours: ${workHours}` : ""}
      ${studyTopics ? `Study topics: ${studyTopics}` : ""}
      ${exercisePreference ? `Exercise preference: ${exercisePreference}` : ""}
      ${mealTimes ? `Meal times: ${mealTimes}` : ""}
      ${
        specificActivities.length > 0
          ? `Specific activities to include: ${specificActivities.join(", ")}`
          : ""
      }
      ${
        weekendDifferent
          ? "Create a different schedule for weekends"
          : "Keep the same schedule for all days"
      }
      
      Format the response as a JSON object with the following structure:
      {
        "overview": "Brief description of this timetable and how it aligns with the user's goals",
        "weekdays": {
          "monday": [
            {
              "timeSlot": "06:00-07:00",
              "activity": "Morning routine",
              "description": "Brief description of what to do",
              "category": "Personal"
            },
            {
              "timeSlot": "07:00-08:00",
              "activity": "Breakfast & Planning",
              "description": "Brief description of what to do",
              "category": "Meal"
            }
            // Continue for the full day
          ],
          "tuesday": [
            // Similar structure for Tuesday
          ],
          // Continue for all weekdays
        },
        "weekend": {
          "saturday": [
            // Similar structure for Saturday
          ],
          "sunday": [
            // Similar structure for Sunday
          ]
        },
        "tips": [
          "Tip 1 for sticking to the schedule",
          "Tip 2 for making the most of the timetable"
        ]
      }
      
      Ensure the timetable is realistic, balanced, and aligns with the user's goals. Include time for breaks, meals, rest, and personal activities.
      Only return valid JSON without any explanations or markdown formatting.`;

    const result = await model.generateContent(prompt);
    const responseText =
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text;
    const jsonString = responseText.replace(/```json|```/g, "").trim();

    try {
      const responseJson = JSON.parse(jsonString);
      res.status(200).json(responseJson);
    } catch (error) {
      console.error("Failed to parse response as JSON:", error);
      res
        .status(500)
        .json({
          message: "Invalid AI response format",
          rawResponse: responseText,
        });
    }
  } catch (error) {
    console.error("Error generating timetable:", error);
    res.status(500).json({ message: error.message });
  }
};
