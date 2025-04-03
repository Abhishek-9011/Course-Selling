import React from "react";
import CourseBanner from "../components/CourseBanner ";
import AutoMovingCarousel from "../components/AutoMovingCarousel ";
import HomeBanner from "../components/HomeBanner";
import AllCourses from "../components/AllCourses";

function Home() {
  return (
    <div className="bg-white rounded-lg shadow-md w-screen mx-auto">
      <HomeBanner />
      <CourseBanner />
      <AutoMovingCarousel />
      <AutoMovingCarousel />
      <AllCourses />
    </div>
  );
}

export default Home;
