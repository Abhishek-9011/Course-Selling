import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Clock, DollarSign, FileText, Image, Eye, AlertCircle, Check } from 'lucide-react';

const CourseEditorPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    duration: '',
    price: '',
    thumbnail: '',
    published: false
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`/api/courses/${courseId}`);
        const data = await response.json();
        
        if (data.success) {
          setFormData({
            title: data.course.title || '',
            description: data.course.description || '',
            shortDescription: data.course.shortDescription || '',
            duration: data.course.duration || '',
            price: data.course.price || '',
            thumbnail: data.course.thumbnail || '',
            published: data.course.published || false
          });
        } else {
          setError(data.message || 'Failed to fetch course details');
        }
      } catch (err) {
        setError('An error occurred while fetching course details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);
    
    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess(true);
        // Reset success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.message || 'Failed to update course');
      }
    } catch (err) {
      setError('An error occurred while updating the course');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    // Open course preview in a new tab
    window.open(`/courses/preview/${courseId}`, '_blank');
  };

  const handleBack = () => {
    navigate('/instructor/courses');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={18} />
          Back to Courses
        </button>
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Edit Course</h1>
          <div className="flex gap-3">
            <button 
              type="button" 
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md flex items-center gap-2"
              onClick={handlePreview}
            >
              <Eye size={18} />
              Preview
            </button>
            <button 
              type="button" 
              className={`px-4 py-2 ${formData.published ? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-500 hover:bg-yellow-600'} text-white rounded-md flex items-center gap-2`}
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  published: !prev.published
                }));
              }}
            >
              {formData.published ? (
                <>
                  <Check size={18} />
                  Published
                </>
              ) : (
                <>
                  <AlertCircle size={18} />
                  Draft
                </>
              )}
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold">Course Details</h2>
            <p className="text-gray-500 text-sm">Update your course information below</p>
          </div>
          
          <div className="p-6">
            <form id="courseForm" onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <label htmlFor="title" className="block font-medium">
                    Course Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Complete JavaScript Masterclass"
                    required
                  />
                </div>
                
                {/* Short Description */}
                <div className="space-y-2">
                  <label htmlFor="shortDescription" className="block font-medium">
                    Short Description <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="shortDescription"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="A brief overview of your course (1-2 sentences)"
                    required
                  />
                </div>
                
                {/* Full Description */}
                <div className="space-y-2">
                  <label htmlFor="description" className="block font-medium">
                    Full Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Provide a detailed description of what students will learn"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Duration */}
                  <div className="space-y-2">
                    <label htmlFor="duration" className="block font-medium flex items-center gap-2">
                      <Clock size={18} />
                      Duration <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 12 hours"
                      required
                    />
                  </div>
                  
                  {/* Price */}
                  <div className="space-y-2">
                    <label htmlFor="price" className="block font-medium flex items-center gap-2">
                      <DollarSign size={18} />
                      Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 49.99"
                      required
                    />
                  </div>
                </div>
                
                {/* Thumbnail */}
                <div className="space-y-2">
                  <label htmlFor="thumbnail" className="block font-medium flex items-center gap-2">
                    <Image size={18} />
                    Thumbnail URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    id="thumbnail"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com/course-image.jpg"
                    required
                  />
                </div>
                
                {/* Thumbnail Preview */}
                {formData.thumbnail && (
                  <div className="border rounded-md overflow-hidden">
                    <img 
                      src={formData.thumbnail} 
                      alt="Course thumbnail preview" 
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/api/placeholder/800/400";
                      }}
                    />
                  </div>
                )}
                
                {/* Published Status */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="published"
                    name="published"
                    checked={formData.published}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="published" className="font-medium">
                    Publish this course (make it visible to students)
                  </label>
                </div>
              </div>
              
              {/* Status Messages */}
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md flex items-center gap-2">
                  <Check size={18} />
                  Course updated successfully!
                </div>
              )}
            </form>
          </div>
          
          <div className="bg-gray-50 px-6 py-4 flex justify-end gap-4 border-t border-gray-200">
            <button 
              type="button" 
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md"
              onClick={handleBack}
            >
              Cancel
            </button>
            <button 
              type="submit"
              form="courseForm"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-2"
              disabled={saving}
            >
              {saving ? 'Saving...' : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseEditorPage;