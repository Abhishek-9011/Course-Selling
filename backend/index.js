import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Quiz from './routes/quiz.route.js' 
const app = express();
app.use(express.json());
dotenv.config();
app.use("/course", Quiz);
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(3000, () => {
    console.log("Server is listening");
  });
}
main();
