import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Quiz from './routes/features.route.js' 
import User from './routes/user.route.js'
import Instructor from './routes/admin.route.js'
import Auth from './routes/auth.route.js'
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
app.use("/course", Quiz);
app.use("/user", User);
app.use("/auth", Auth);
app.use("/instructor", Instructor);
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(3000, () => {
    console.log("Server is listening");
  });
}
main();
