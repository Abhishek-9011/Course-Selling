import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Home from "./pages/Home";
import Footer from "./layout/Footer"
import CourseCatalog from "./pages/CourseCatalog ";
import QuizGenerator from "./features/ai/QuizGenerator";
import RoadmapGenerator from "./features/ai/RoadmapGenerator";
import ScheduleGeneratorForm from "./features/ai/ScheduleGeneratorForm";
import CourseListingPage from "./pages/instructor/CourseListingPage";
import CourseEditorPage from "./pages/instructor/CourseEditorPage";
import AdminDashboard from "./pages/instructor/AdminDashboard";
import QuizPage from "./pages/ai/QuizPage";
import RoadmapPage from "./pages/ai/RoadmapPage";
import TimetableDisplay from "./pages/ai/TimetableDisplay";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/course" element={<CourseCatalog/>}></Route>
          <Route path="/signin" element={<Signin/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/quiz-form" element={<QuizGenerator/>}></Route>
          <Route path="/roadmap-form" element={<RoadmapGenerator/>}></Route>
          <Route path="/timetable-form" element={<ScheduleGeneratorForm/>}></Route>
          <Route path="/created-courses" element={<CourseListingPage/>}></Route>
          <Route path="/edit-course" element={<CourseEditorPage/>}></Route>
          <Route path="/admin-dashboard" element={<AdminDashboard/>}></Route>
          <Route path="/quiz" element={<QuizPage/>}></Route>
          <Route path="/roadmap" element={<RoadmapPage/>}></Route>
          <Route path="/timetable" element={<TimetableDisplay/>}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
