import React from 'react';

function HomeBanner() {
  return (
    <div className="flex flex-col bg-white md:flex-row justify-between items-center p-6 md:p-12  rounded-xl">
      <div className="max-w-xl mb-8 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          <span className="text-black">Learn Any Skill</span>
          <br />
          <span className="text-black">to Advance Your</span>
          <br />
          <span className="text-blue-600">Career path</span>
        </h1>
        
        <p className="text-gray-600 mt-6 text-sm md:text-base">
          Caleb Asiedu N. is a Brand Identity, UI/UX & Web Designer,
          <br className="hidden md:block" />
          passionate about building brands that inspire & solving problems
          <br className="hidden md:block" />
          creatively with a slight addiction to coffee and music.
        </p>

        <div className="flex flex-wrap mt-8 items-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md">
            Learning
          </button>
          <button className="bg-white hover:bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors border border-gray-200 shadow-sm flex items-center">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play Showreel
          </button>
          <div className="flex items-center ml-auto md:ml-0">
            <div className="relative">
              <div className="flex">
                <img src="/api/placeholder/40/40" alt="User" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                <img src="/api/placeholder/40/40" alt="User" className="w-8 h-8 rounded-full border-2 border-white -ml-3 shadow-sm" />
              </div>
            </div>
            <div className="ml-2">
              <div className="flex items-center">
                <span className="text-yellow-400 flex">
                  ★★★★★
                </span>
                <span className="text-xs text-gray-500 ml-1">5/5 rate the items</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r "></div>
        <div>
          <img 
            src="/computer.png" 
            alt="Career learning platform" 
            className="w-full max-w-md rounded-lg object-cover" 
          />
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;