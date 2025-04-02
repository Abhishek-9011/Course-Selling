import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Footer";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import CourseBanner from "./components/CourseBanner ";
import AutoMovingCarousel from "./components/AutoMovingCarousel ";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/signin" element={<Signin/>}></Route>
          <Route path="/" element={<CourseBanner/>}></Route>
          <Route path="/carous" element={<AutoMovingCarousel/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
