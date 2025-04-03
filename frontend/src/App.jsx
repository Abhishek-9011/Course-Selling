import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import CourseBanner from "./components/CourseBanner ";
import AutoMovingCarousel from "./components/AutoMovingCarousel ";
import Home from "./pages/Home";
import Footer from "./layout/Footer"
import CourseCatalog from "./pages/CourseCatalog ";
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
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
