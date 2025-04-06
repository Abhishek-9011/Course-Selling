import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Home from "./pages/Home";
import Footer from "./layout/Footer"
import CourseCatalog from "./pages/CourseCatalog ";
import QuizGenerator from "./pages/QuizGenerator";
import RoadmapGenerator from "./pages/RoadmapGenerator";
import ScheduleGeneratorForm from "./pages/ScheduleGeneratorForm";
// import CreateCourse from "./pages/CreateCourse";
import CourseListingPage from "./pages/CourseListingPage";
import CourseEditorPage from "./pages/CourseEditorPage";
import AdminDashboard from "./pages/AdminDashboard";
import QuizPage from "./pages/QuizPage";
import RoadmapPage from "./pages/RoadmapPage";
import TimetableDisplay from "./pages/TimetableDisplay ";
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
          {/* <Route path="/create-course" element={<CreateCourse/>}></Route> */}
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
