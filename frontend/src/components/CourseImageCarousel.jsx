import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CourseImageCarousel = ({ courses = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);

  // Clone the courses array to create seamless looping
  const extendedCourses = courses.length > 0 ? [...courses, ...courses, ...courses] : [];

  useEffect(() => {
    if (courses.length === 0) return;
    
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prevIndex) => {
          // When we reach the end of the original courses, reset to middle section
          if (prevIndex >= courses.length * 2 - 1) {
            return courses.length;
          }
          return prevIndex + 1;
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, courses.length]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const goToPrev = () => {
    setCurrentIndex(prevIndex => {
      if (prevIndex <= 0) {
        return courses.length * 2 - 1;
      }
      return prevIndex - 1;
    });
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => {
      if (prevIndex >= courses.length * 2 - 1) {
        return 0;
      }
      return prevIndex + 1;
    });
  };

  if (courses.length === 0) {
    return <div className="text-center py-8 text-gray-500">No courses available</div>;
  }

  return (
    <div className="w-full px-4 py-8">
      <div className="max-w-6xl mx-auto relative">
        <div
          className="relative overflow-hidden rounded-xl"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={carouselRef}
        >
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(${-currentIndex * (100 / 3)}%)` }}
          >
            {extendedCourses.map((course, index) => (
              <div
                key={`${course.id}-${index}`}
                className="min-w-[33.33%] px-2 flex-shrink-0"
              >
                <div className="relative aspect-video overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <img
                    src={course.image || '/placeholder-course.jpg'}
                    alt={course.title || 'Course image'}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                    <h3 className="text-white font-medium truncate">{course.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <button 
          onClick={goToPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors z-10"
          aria-label="Previous course"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button 
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors z-10"
          aria-label="Next course"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        {/* Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {courses.map((_, index) => (
            <button
              key={index} 
              onClick={() => setCurrentIndex(index + courses.length)}
              className={`w-3 h-3 rounded-full transition-colors ${
                (currentIndex % courses.length) === index ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to course ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseImageCarousel;