import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Users, Star, DollarSign, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CourseListingPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/instructor/courses');
        const data = await response.json();
        
        if (data.success) {
          setCourses(data.courses);
        } else {
          setError(data.message || 'Failed to fetch courses');
        }
      } catch (err) {
        setError('An error occurred while fetching courses');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateCourse = () => {
    navigate('/instructor/courses/create');
  };

  const handleEditCourse = (courseId) => {
    navigate(`/instructor/courses/edit/${courseId}`);
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/courses/${courseId}`, {
          method: 'DELETE',
        });
        
        const data = await response.json();
        
        if (data.success) {
          setCourses(courses.filter(course => course._id !== courseId));
        } else {
          alert(data.message || 'Failed to delete course');
        }
      } catch (err) {
        alert('An error occurred while deleting the course');
        console.error(err);
      }
    }
  };

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="text-gray-600 mt-1">Manage and track all your courses</p>
        </div>
        <button 
          onClick={handleCreateCourse}
          className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus size={18} />
          Create New Course
        </button>
      </div>

      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search courses by title or description..."
          className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center text-red-600">{error}</div>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-10 text-center">
          <div className="mb-4 text-gray-400">
            <Search size={48} className="mx-auto" />
          </div>
          {searchTerm ? (
            <p className="text-lg">No courses match your search criteria. Try different keywords.</p>
          ) : (
            <div>
              <p className="text-lg mb-4">You haven't created any courses yet.</p>
              <button 
                onClick={handleCreateCourse}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 mx-auto"
              >
                <Plus size={18} />
                Create Your First Course
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCourses.map(course => (
            <div key={course._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <img 
                  src={course.thumbnail || "/api/placeholder/800/400"} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 m-3">
                  <div className="bg-white/90 p-1.5 rounded-md shadow flex space-x-1">
                    <button 
                      onClick={() => handleEditCourse(course._id)}
                      className="p-1 hover:bg-gray-100 rounded"
                      title="Edit Course"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteCourse(course._id)}
                      className="p-1 hover:bg-gray-100 rounded text-red-500"
                      title="Delete Course"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-5">
                <h2 className="text-xl font-bold mb-2">{course.title}</h2>
                <p className="text-gray-600 mb-4">{course.shortDescription}</p>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users size={16} />
                    <span>{course.enrollments || 0} students</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Star size={16} />
                    <span>{course.averageRating || 0}/5 ({course.reviewCount || 0})</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <DollarSign size={16} />
                    <span>${course.price}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Eye size={16} />
                    <span>{course.views || 0} views</span>
                  </div>
                </div>
                
                <div className="flex justify-between mt-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    course.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {course.published ? 'Published' : 'Draft'}
                  </span>
                  
                  <button
                    onClick={() => handleEditCourse(course._id)}
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                  >
                    Manage Course
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseListingPage;