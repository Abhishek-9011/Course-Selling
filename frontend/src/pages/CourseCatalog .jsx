import React, { useState, useEffect } from 'react';
import { Search, Filter, BookOpen, Clock, Award, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const CourseCatalog = () => {
  // Extended sample course data
  const initialCourses = [
    {
      id: 1,
      title: "Introduction to Web Development",
      description: "Learn the basics of HTML, CSS, and JavaScript to build modern websites.",
      category: "Programming",
      level: "Beginner",
      duration: "8 weeks",
      rating: 4.7,
      instructor: "Sarah Johnson",
      image: "/api/placeholder/320/180"
    },
    {
      id: 2,
      title: "Advanced React Patterns",
      description: "Master advanced React concepts including hooks, context, and performance optimization.",
      category: "Programming",
      level: "Advanced",
      duration: "6 weeks",
      rating: 4.9,
      instructor: "Michael Chen",
      image: "/api/placeholder/320/180"
    },
    {
      id: 3,
      title: "Digital Marketing Fundamentals",
      description: "Learn key strategies for SEO, social media, and content marketing.",
      category: "Marketing",
      level: "Beginner",
      duration: "4 weeks",
      rating: 4.5,
      instructor: "Emily Rodriguez",
      image: "/api/placeholder/320/180"
    },
    {
      id: 4,
      title: "Financial Planning and Analysis",
      description: "Understand how to create and analyze financial statements and forecasts.",
      category: "Finance",
      level: "Intermediate",
      duration: "10 weeks",
      rating: 4.6,
      instructor: "David Williams",
      image: "/api/placeholder/320/180"
    },
    {
      id: 5,
      title: "Data Visualization with Python",
      description: "Create compelling visualizations using Python libraries like Matplotlib and Seaborn.",
      category: "Data Science",
      level: "Intermediate",
      duration: "6 weeks",
      rating: 4.8,
      instructor: "Priya Patel",
      image: "/api/placeholder/320/180"
    },
    {
      id: 6,
      title: "UX/UI Design Principles",
      description: "Learn user-centered design principles to create intuitive digital experiences.",
      category: "Design",
      level: "Beginner",
      duration: "8 weeks",
      rating: 4.7,
      instructor: "Alex Thompson",
      image: "/api/placeholder/320/180"
    },
    {
      id: 7,
      title: "Introduction to Machine Learning",
      description: "Learn the fundamentals of machine learning algorithms and their applications.",
      category: "Data Science",
      level: "Intermediate",
      duration: "12 weeks",
      rating: 4.9,
      instructor: "James Wilson",
      image: "/api/placeholder/320/180"
    },
    {
      id: 8,
      title: "Mobile App Development with Flutter",
      description: "Build cross-platform mobile applications using Google's Flutter framework.",
      category: "Programming",
      level: "Intermediate",
      duration: "8 weeks",
      rating: 4.6,
      instructor: "Lisa Wong",
      image: "/api/placeholder/320/180"
    },
    {
      id: 9,
      title: "Content Strategy for Social Media",
      description: "Develop effective content strategies for various social media platforms.",
      category: "Marketing",
      level: "Intermediate",
      duration: "6 weeks",
      rating: 4.4,
      instructor: "Marcus Johnson",
      image: "/api/placeholder/320/180"
    },
    {
      id: 10,
      title: "Investment Fundamentals",
      description: "Learn about different investment vehicles and strategies for portfolio management.",
      category: "Finance",
      level: "Beginner",
      duration: "5 weeks",
      rating: 4.5,
      instructor: "Anna Lewis",
      image: "/api/placeholder/320/180"
    },
    {
      id: 11,
      title: "Graphic Design Essentials",
      description: "Master the principles of visual design and practical skills in design software.",
      category: "Design",
      level: "Beginner",
      duration: "7 weeks",
      rating: 4.8,
      instructor: "Daniel Park",
      image: "/api/placeholder/320/180"
    },
    {
      id: 12,
      title: "Advanced Data Analysis",
      description: "Deep dive into statistical methods and tools for complex data analysis.",
      category: "Data Science",
      level: "Advanced",
      duration: "10 weeks",
      rating: 4.7,
      instructor: "Sophia Chen",
      image: "/api/placeholder/320/180"
    },
    {
      id: 13,
      title: "Cybersecurity Fundamentals",
      description: "Learn essential practices for securing systems and networks against threats.",
      category: "IT Security",
      level: "Beginner",
      duration: "8 weeks",
      rating: 4.6,
      instructor: "Robert Garcia",
      image: "/api/placeholder/320/180"
    },
    {
      id: 14,
      title: "Cloud Computing with AWS",
      description: "Master cloud infrastructure and services using Amazon Web Services.",
      category: "Cloud Computing",
      level: "Intermediate",
      duration: "9 weeks",
      rating: 4.8,
      instructor: "Jennifer Taylor",
      image: "/api/placeholder/320/180"
    },
    {
      id: 15,
      title: "Search Engine Optimization",
      description: "Learn strategies and techniques to improve website visibility in search engines.",
      category: "Marketing",
      level: "Intermediate",
      duration: "6 weeks",
      rating: 4.5,
      instructor: "Carlos Rivera",
      image: "/api/placeholder/320/180"
    },
    {
      id: 16,
      title: "Blockchain Development",
      description: "Build decentralized applications using blockchain technology.",
      category: "Programming",
      level: "Advanced",
      duration: "10 weeks",
      rating: 4.7,
      instructor: "Natasha Singh",
      image: "/api/placeholder/320/180"
    },
    {
      id: 17,
      title: "Corporate Finance",
      description: "Understand financial decision-making processes in corporate environments.",
      category: "Finance",
      level: "Advanced",
      duration: "8 weeks",
      rating: 4.6,
      instructor: "Thomas Miller",
      image: "/api/placeholder/320/180"
    },
    {
      id: 18,
      title: "Motion Graphics and Animation",
      description: "Create engaging animated visuals and motion graphics for digital media.",
      category: "Design",
      level: "Intermediate",
      duration: "7 weeks",
      rating: 4.8,
      instructor: "Michelle Wong",
      image: "/api/placeholder/320/180"
    },
    {
      id: 19,
      title: "DevOps Engineering",
      description: "Learn practices for continuous integration and delivery in software development.",
      category: "IT Operations",
      level: "Intermediate",
      duration: "9 weeks",
      rating: 4.7,
      instructor: "Kevin Adams",
      image: "/api/placeholder/320/180"
    },
    {
      id: 20,
      title: "Business Intelligence",
      description: "Learn to transform data into actionable insights for business decision-making.",
      category: "Data Science",
      level: "Intermediate",
      duration: "7 weeks",
      rating: 4.6,
      instructor: "Olivia Martinez",
      image: "/api/placeholder/320/180"
    }
  ];

  // State management
  const [courses, setCourses] = useState(initialCourses);
  const [filteredCourses, setFilteredCourses] = useState(initialCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeLevel, setActiveLevel] = useState('All');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(6);

  // Extract unique categories and levels
  const categories = ['All', ...new Set(courses.map(course => course.category))];
  const levels = ['All', ...new Set(courses.map(course => course.level))];

  // Filter courses when search term, category, or level changes
  useEffect(() => {
    let results = courses;
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (activeCategory !== 'All') {
      results = results.filter(course => course.category === activeCategory);
    }
    
    // Filter by level
    if (activeLevel !== 'All') {
      results = results.filter(course => course.level === activeLevel);
    }
    
    setFilteredCourses(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, activeCategory, activeLevel, courses]);

  // Get current courses for pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already handled by useEffect
  };

  // Toggle mobile filters
  const toggleMobileFilters = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Course Catalog</h1>
          
          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <input 
                type="text"
                placeholder="Search courses..."
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r"
            >
              Search
            </button>
          </form>
        </div>
      </header>
      
      {/* Mobile filter toggle */}
      <div className="md:hidden mb-4">
        <button 
          onClick={toggleMobileFilters}
          className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded"
        >
          <Filter className="h-5 w-5" />
          <span>{isMobileFilterOpen ? 'Hide Filters' : 'Show Filters'}</span>
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar filters - hidden on mobile unless toggled */}
        <aside className={`${isMobileFilterOpen ? 'block' : 'hidden'} md:block w-full md:w-64 shrink-0`}>
          <div className="bg-white p-4 rounded-lg shadow">
            {/* Category filters */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="h-5 w-5 text-gray-700" />
                <h2 className="text-lg font-semibold">Categories</h2>
              </div>
              <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-md text-sm font-medium text-left transition-colors ${
                      activeCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Level filters */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Award className="h-5 w-5 text-gray-700" />
                <h2 className="text-lg font-semibold">Levels</h2>
              </div>
              <div className="flex flex-col gap-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    className={`px-4 py-2 rounded-md text-sm font-medium text-left transition-colors ${
                      activeLevel === level
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveLevel(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Clear filters button */}
            {(activeCategory !== 'All' || activeLevel !== 'All' || searchTerm) && (
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All');
                  setActiveLevel('All');
                }}
                className="w-full mt-6 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1">
          {/* Results summary */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {indexOfFirstCourse + 1}-{Math.min(indexOfLastCourse, filteredCourses.length)} of {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
              {activeCategory !== 'All' && ` in ${activeCategory}`}
              {activeLevel !== 'All' && ` for ${activeLevel} level`}
            </p>
          </div>
          
          {/* Course grid */}
          {filteredCourses.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {course.category}
                        </span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm font-medium">{course.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{course.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm mb-4">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span>{course.level}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Instructor: {course.instructor}</span>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                          Enroll
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8">
                  <nav className="flex items-center gap-1">
                    <button 
                      onClick={prevPage} 
                      disabled={currentPage === 1}
                      className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    
                    <div className="flex items-center gap-1">
                      {/* Show page numbers with ellipsis for large page counts */}
                      {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        
                        // Always show first page, last page, current page, and one page before and after current
                        if (
                          pageNumber === 1 || 
                          pageNumber === totalPages || 
                          Math.abs(pageNumber - currentPage) <= 1
                        ) {
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => paginate(pageNumber)}
                              className={`w-8 h-8 flex items-center justify-center rounded-md ${
                                pageNumber === currentPage 
                                  ? 'bg-blue-600 text-white' 
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              {pageNumber}
                            </button>
                          );
                        }
                        
                        // Show ellipsis for gaps in page numbers
                        if (
                          (pageNumber === 2 && currentPage > 3) ||
                          (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                        ) {
                          return <span key={pageNumber} className="px-1">...</span>;
                        }
                        
                        return null;
                      })}
                    </div>
                    
                    <button 
                      onClick={nextPage} 
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                      aria-label="Next page"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No courses match your search criteria.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All');
                  setActiveLevel('All');
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Clear filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CourseCatalog;