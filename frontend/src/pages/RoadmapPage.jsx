import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Book, PlayCircle, Clock, Flag, Briefcase, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

const RoadmapPage = () => {
  const [roadmap, setRoadmap] = useState(null);
  const [expandedStages, setExpandedStages] = useState({});
  const [expandedCareerPaths, setExpandedCareerPaths] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve roadmap data from localStorage
    const roadmapData = localStorage.getItem('currentRoadmap');
    
    if (roadmapData) {
      const parsedRoadmap = JSON.parse(roadmapData);
      setRoadmap(parsedRoadmap);
      
      // Initialize all stages as expanded
      const initialExpandedState = {};
      parsedRoadmap.stages.forEach((stage, index) => {
        initialExpandedState[index] = true;
      });
      setExpandedStages(initialExpandedState);
    } else {
      // Redirect back to roadmap generator if no roadmap data is found
      navigate('/');
    }
  }, [navigate]);

  const toggleStage = (index) => {
    setExpandedStages(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleCareerPaths = () => {
    setExpandedCareerPaths(!expandedCareerPaths);
  };

  const backToHome = () => {
    navigate('/');
  };

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading roadmap...</p>
        </div>
      </div>
    );
  }

  const getResourceIcon = (type) => {
    switch(type.toLowerCase()) {
      case 'book':
        return <Book className="h-4 w-4" />;
      case 'course':
      case 'video':
        return <PlayCircle className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-teal-600 text-white p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={backToHome}
            className="mb-4 flex items-center text-teal-100 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Generator
          </button>
          <h1 className="text-3xl font-bold">{roadmap.field} Roadmap</h1>
          <p className="mt-2 text-teal-100">{roadmap.overview}</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="space-y-6">
          {roadmap.stages.map((stage, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div 
                className={`p-4 flex justify-between items-center cursor-pointer ${
                  index === 0 ? 'bg-teal-100' : 
                  index === 1 ? 'bg-teal-50' : 'bg-gray-50'
                }`}
                onClick={() => toggleStage(index)}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white mr-3 ${
                    index === 0 ? 'bg-teal-600' : 
                    index === 1 ? 'bg-teal-500' : 'bg-teal-400'
                  }`}>
                    {index + 1}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">{stage.name}</h2>
                </div>
                <div>
                  {expandedStages[index] ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
              
              {expandedStages[index] && (
                <div className="p-4 border-t border-gray-100">
                  <p className="text-gray-700 mb-4">{stage.description}</p>
                  
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-teal-500" /> 
                      Estimated Timeframe
                    </h3>
                    <p className="text-gray-700 bg-gray-50 p-2 rounded">{stage.timeframe}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-800 mb-2">Key Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {stage.topics.map((topic, topicIndex) => (
                        <span 
                          key={topicIndex} 
                          className={`px-3 py-1 rounded-full text-sm ${
                            index === 0 ? 'bg-teal-100 text-teal-800' : 
                            index === 1 ? 'bg-teal-50 text-teal-700' : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                      <Flag className="h-4 w-4 mr-2 text-teal-500" /> 
                      Milestones
                    </h3>
                    <ul className="space-y-2">
                      {stage.milestones.map((milestone, milestoneIndex) => (
                        <li key={milestoneIndex} className="flex items-start">
                          <div className="h-5 w-5 rounded-full border-2 border-teal-500 flex-shrink-0 mt-0.5"></div>
                          <span className="ml-2 text-gray-700">{milestone}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-800 mb-2">Recommended Resources</h3>
                    <div className="space-y-3">
                      {stage.resources.map((resource, resourceIndex) => (
                        <div key={resourceIndex} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center mb-1">
                            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-teal-100 text-teal-600 mr-2">
                              {getResourceIcon(resource.type)}
                            </div>
                            <h4 className="font-medium">{resource.title}</h4>
                            <span className="ml-2 text-xs px-2 py-0.5 bg-gray-200 rounded text-gray-700">{resource.type}</span>
                          </div>
                          <p className="text-sm text-gray-600">{resource.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div 
              className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
              onClick={toggleCareerPaths}
            >
              <div className="flex items-center">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-teal-600 text-white mr-3">
                  <Briefcase className="h-4 w-4" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Career Paths</h2>
              </div>
              <div>
                {expandedCareerPaths ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>
            
            {expandedCareerPaths && (
              <div className="p-4 border-t border-gray-100">
                <div className="space-y-4">
                  {roadmap.careerPaths.map((path, pathIndex) => (
                    <div key={pathIndex} className="bg-gray-50 p-3 rounded-lg">
                      <h3 className="font-medium text-teal-700 mb-1">{path.title}</h3>
                      <p className="text-gray-700">{path.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoadmapPage;