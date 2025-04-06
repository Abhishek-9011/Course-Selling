import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowLeft, CheckCircle, Info, Download, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Correct import for React Router

const TimetableDisplay = () => {
  const navigate = useNavigate(); // Correct hook for React Router
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState('monday');
  const [viewMode, setViewMode] = useState('weekday'); // 'weekday' or 'weekend'

  // Color mapping for different activity categories
  const categoryColors = {
    'Work': 'bg-blue-100 border-blue-300 text-blue-800',
    'Study': 'bg-indigo-100 border-indigo-300 text-indigo-800',
    'Meal': 'bg-green-100 border-green-300 text-green-800',
    'Exercise': 'bg-orange-100 border-orange-300 text-orange-800',
    'Personal': 'bg-purple-100 border-purple-300 text-purple-800',
    'Rest': 'bg-red-100 border-red-300 text-red-800',
    'Sleep': 'bg-gray-100 border-gray-300 text-gray-800'
  };

  // Default color for categories not in the mapping
  const defaultColor = 'bg-gray-100 border-gray-300 text-gray-700';

  useEffect(() => {
    // Fetch timetable data from localStorage
    const fetchTimetable = () => {
      try {
        const storedTimetable = localStorage.getItem('generatedTimetable');
        if (storedTimetable) {
          setTimetable(JSON.parse(storedTimetable));
        } else {
          // If no data in localStorage, you could redirect back to form
          console.error('No timetable data found');
        }
      } catch (error) {
        console.error('Error retrieving timetable:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, []);

  const handleBackToForm = () => {
    navigate('/schedule-generator'); // Using navigate instead of router.push
  };

  const downloadTimetable = () => {
    if (!timetable) return;
    
    // Create a formatted text version of the timetable
    let content = `MY PERSONALIZED TIMETABLE\n\n`;
    content += `${timetable.overview}\n\n`;
    
    // Add weekdays
    content += `WEEKDAYS:\n\n`;
    Object.entries(timetable.weekdays).forEach(([day, activities]) => {
      content += `${day.toUpperCase()}:\n`;
      activities.forEach(item => {
        content += `${item.timeSlot} - ${item.activity} (${item.category})\n`;
        content += `  ${item.description}\n`;
      });
      content += `\n`;
    });
    
    // Add weekends
    content += `WEEKENDS:\n\n`;
    Object.entries(timetable.weekend).forEach(([day, activities]) => {
      content += `${day.toUpperCase()}:\n`;
      activities.forEach(item => {
        content += `${item.timeSlot} - ${item.activity} (${item.category})\n`;
        content += `  ${item.description}\n`;
      });
      content += `\n`;
    });
    
    // Add tips
    content += `TIPS:\n`;
    timetable.tips.forEach((tip, index) => {
      content += `${index + 1}. ${tip}\n`;
    });
    
    // Create download link
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-timetable.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mb-4"></div>
          <h2 className="text-xl font-medium text-gray-700">Loading your timetable...</h2>
        </div>
      </div>
    );
  }

  if (!timetable) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center max-w-lg p-8 bg-white rounded-xl shadow-lg">
          <div className="inline-block rounded-full p-3 bg-red-100 mb-4">
            <Info size={30} className="text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">No Timetable Found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find your timetable data. Please go back and generate a new schedule.
          </p>
          <button
            onClick={handleBackToForm}
            className="bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center mx-auto"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Schedule Generator
          </button>
        </div>
      </div>
    );
  }

  // Determine which data to display based on view mode
  const daysData = viewMode === 'weekday' ? timetable.weekdays : timetable.weekend;
  const days = Object.keys(daysData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white text-center rounded-t-2xl shadow-lg">
          <div className="flex items-center justify-center mb-4">
            <Calendar size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Your Personalized Timetable</h1>
          <p className="text-indigo-100 max-w-2xl mx-auto">
            {timetable.overview}
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white p-4 md:p-6 shadow-md border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={handleBackToForm}
            className="flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <ArrowLeft size={18} className="mr-1" />
            Back to Generator
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('weekday')}
              className={`px-4 py-2 rounded-l-lg flex items-center ${
                viewMode === 'weekday' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Sun size={16} className="mr-2" />
              Weekday
            </button>
            <button
              onClick={() => setViewMode('weekend')}
              className={`px-4 py-2 rounded-r-lg flex items-center ${
                viewMode === 'weekend' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Moon size={16} className="mr-2" />
              Weekend
            </button>
          </div>

          <button
            onClick={downloadTimetable}
            className="flex items-center text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
          >
            <Download size={18} className="mr-2" />
            Download
          </button>
        </div>

        {/* Day Navigation */}
        <div className="bg-white shadow-md overflow-x-auto">
          <div className="flex min-w-max">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-6 py-4 flex-1 text-center capitalize transition ${
                  activeDay === day
                    ? 'border-b-2 border-indigo-600 text-indigo-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Timetable Content */}
        <div className="bg-white rounded-b-2xl shadow-lg p-4 md:p-6">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 capitalize mb-2">{activeDay}'s Schedule</h2>
            <div className="h-1 w-20 bg-indigo-600 rounded"></div>
          </div>

          <div className="space-y-4">
            {daysData[activeDay]?.map((item, index) => (
              <div 
                key={index} 
                className={`border-l-4 rounded-lg shadow-sm p-4 ${
                  categoryColors[item.category] || defaultColor
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div className="flex items-center">
                    <Clock size={18} className="mr-2 flex-shrink-0" />
                    <span className="font-medium">{item.timeSlot}</span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-70">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-1">{item.activity}</h3>
                <p className="text-sm opacity-90">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Tips Section */}
          <div className="mt-10 bg-indigo-50 p-5 rounded-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <CheckCircle size={20} className="mr-2 text-indigo-600" />
              Tips for Success
            </h3>
            <ul className="space-y-2">
              {timetable.tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 rounded-full bg-indigo-600 text-white w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimetableDisplay;