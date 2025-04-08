import React, { useState } from 'react';
import { GraduationCap, UserCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem("token");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <nav className="w-full py-4 px-6 flex items-center justify-between relative">
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

      <div className="relative">
        {token ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="focus:outline-none"
            >
              <UserCircle className="w-8 h-8 text-black hover:text-gray-600 transition-colors" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200 z-10">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 text-black"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="border border-black px-4 py-2 hover:bg-gray-100 transition-colors">
            <Link to="/signin">Login</Link>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
