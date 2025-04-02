import React from 'react';

const CourseBanner = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-16 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-2">
          Your learning journey
          <span className="block">starts here.</span>
        </h1>
        <div className="w-32 h-1 bg-indigo-600 mx-auto mt-2 mb-6 rounded-full"></div>
        
        <p className="text-xl text-gray-700 mb-8">
          Explore our curated selection of top-rated courses and find the
          skills that will transform your career.
        </p>
        

        
        
      </div>
    </div>
  );
};

export default CourseBanner;