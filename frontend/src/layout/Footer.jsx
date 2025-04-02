import React from 'react';
import { GraduationCap } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="w-full py-4 px-6 bg-green-50 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <GraduationCap className="w-6 h-6 text-black" />
        <span className="text-xl font-bold">
          Next<span className="font-bold">Learn</span>
        </span>
      </div>
      
      <div className="hidden md:flex items-center space-x-8">
        <a href="#" className="text-black hover:text-gray-600 font-medium">Home</a>
        <a href="#" className="text-black hover:text-gray-600 font-medium">Course</a>
        <a href="#" className="text-black hover:text-gray-600 font-medium">Mentors</a>
        <a href="#" className="text-black hover:text-gray-600 font-medium">About Us</a>
        <a href="#" className="text-black hover:text-gray-600 font-medium">Contact Us</a>
      </div>
      
      <div>
        <button className="border border-black px-4 py-2 hover:bg-gray-100 transition-colors">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;