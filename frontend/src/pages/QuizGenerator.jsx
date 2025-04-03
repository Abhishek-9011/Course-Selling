import React, { useState } from 'react';
import { Search, BookOpen, ArrowRight } from 'lucide-react';

const QuizGenerator = () => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    
    setIsLoading(true);
    // In a real application, you would handle the form submission here
    // For example, redirect to a quiz page with the selected topic
    console.log(`Generating quiz for topic: ${topic}`);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      alert(`Quiz on "${topic}" would be generated here!`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-white">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-center">Quiz Generator</h1>
          <p className="text-indigo-100 text-center mt-2">
            Enter a topic and we'll create a custom quiz for you
          </p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter a topic (e.g., World History, Python Programming)"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !topic.trim()}
            className={`mt-6 w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium ${
              isLoading || !topic.trim()
                ? 'bg-indigo-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Quiz...
              </div>
            ) : (
              <div className="flex items-center">
                Generate Quiz <ArrowRight className="ml-2 h-5 w-5" />
              </div>
            )}
          </button>
        </form>
        
        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Our quizzes adapt to your knowledge level and help you learn efficiently.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizGenerator;