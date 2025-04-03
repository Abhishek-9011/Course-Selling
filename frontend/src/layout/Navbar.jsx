import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full py-4 px-6  flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <GraduationCap className="w-6 h-6 text-black" />
        <span className="text-xl font-bold">
          Next<span className="font-bold">Learn</span>
        </span>
      </div>
      
      <div className="hidden md:flex items-center space-x-8">
        <Link to={"/"} className="text-black hover:text-gray-600 font-medium">Home</Link>
        <Link to={"/course"} className="text-black hover:text-gray-600 font-medium">Course</Link>
        <Link to={"/about-us"} className="text-black hover:text-gray-600 font-medium">About Us</Link>
        <Link to={"/contact-us"} className="text-black hover:text-gray-600 font-medium">Contact Us</Link>
      </div>
      
      <div>
        <button className="border border-black px-4 py-2 hover:bg-gray-100 transition-colors">
          <Link to={"/signin"} >
          Login</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;