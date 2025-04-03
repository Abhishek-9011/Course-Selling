import React, { useState, useEffect, useRef } from 'react';

const AutoMovingCarousel = () => {
  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "Sarah Johnson",
      rating: 4.8,
      students: 15243,
      price: 89.99,
      image: "/api/placeholder/400/225"
    },
    {
      id: 2,
      title: "Advanced Data Science Masterclass",
      instructor: "Michael Chen",
      rating: 4.9,
      students: 8756,
      price: 129.99,
      image: "/api/placeholder/400/225"
    },
    {
      id: 3,
      title: "UX/UI Design: From Beginner to Expert",
      instructor: "Emma Rodriguez",
      rating: 4.7,
      students: 12089,
      price: 94.99,
      image: "/api/placeholder/400/225"
    },
    {
      id: 4,
      title: "Python Programming: Complete Guide",
      instructor: "David Kim",
      rating: 4.8,
      students: 18652,
      price: 79.99,
      image: "/api/placeholder/400/225"
    },
    {
      id: 5,
      title: "Digital Marketing Strategy",
      instructor: "Olivia Martinez",
      rating: 4.6,
      students: 9437,
      price: 69.99,
      image: "/api/placeholder/400/225"
    },
    {
      id: 6,
      title: "Machine Learning A-Z",
      instructor: "James Wilson",
      rating: 4.9,
      students: 14329,
      price: 119.99,
      image: "/api/placeholder/400/225"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);

  // Clone the courses array to create seamless looping
  const extendedCourses = [...courses, ...courses, ...courses];

  useEffect(() => {
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
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused, courses.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index + courses.length); // Start from the middle section
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Calculate visible slides based on current index
  const getVisibleCourses = () => {
    // Show 3 cards at a time
    let visibleIndices = [];
    for (let i = 0; i < 3; i++) {
      visibleIndices.push(currentIndex + i);
    }
    return visibleIndices.map(index => extendedCourses[index]);
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <span key={i}>
            {i < fullStars ? (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64- 7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ) : i === fullStars && hasHalfStar ? (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            )}
          </span>
        ))}
      </div>
    );
  };

  const visibleCourses = getVisibleCourses();

  return (
    <div className="w-full px-4 py-8 ">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Featured Courses</h2>
          {/* <div className="flex space-x-2">
            {courses.map((_, index) => (
              <button
                key={index} 
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  (currentIndex % courses.length) === index ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div> */}
        </div>

        <div
          className="relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={carouselRef}
        >
          <div className="flex transition-transform duration-500 ease-in-out"
               style={{ transform: `translateX(${-currentIndex * 33.33}%)` }}>
            {extendedCourses.map((course, index) => (
              <div
                key={`${course.id}-${index}`} // Unique key with index to avoid duplicates
                className="min-w-[33.33%] px-4 flex-shrink-0 transition-all duration-300"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 truncate">{course.title}</h3>
                    <p className="text-gray-600 mb-2">{course.instructor}</p>
                    <div className="flex items-center mb-2">
                      {renderStars(course.rating)}
                      <span className="ml-1 text-gray-600 text-sm">{course.rating}</span>
                      <span className="ml-2 text-gray-500 text-sm">({course.students.toLocaleString()} students)</span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-indigo-600 font-bold">${course.price}</span>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          {/* <button 
            onClick={() => {
              setCurrentIndex(prevIndex => {
                if (prevIndex <= 0) {
                  return courses.length * 2 - 1;
                }
                return prevIndex - 1;
              });
            }}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 mr-4"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button> */}
          {/* <button 
            onClick={() => {
              setCurrentIndex(prevIndex => {
                if (prevIndex >= courses.length * 2 - 1) {
                  return 0;
                }
                return prevIndex + 1;
              });
            }}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default AutoMovingCarousel;