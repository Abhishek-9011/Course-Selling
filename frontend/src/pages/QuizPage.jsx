import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, HelpCircle } from 'lucide-react';

const QuizPage = () => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve quiz data from localStorage
    const quizData = localStorage.getItem('currentQuiz');
    
    if (quizData) {
      setQuiz(JSON.parse(quizData));
      // Initialize userAnswers array with empty values
      const parsedQuiz = JSON.parse(quizData);
      setUserAnswers(new Array(parsedQuiz.questions.length).fill(null));
    } else {
      // Redirect back to quiz generator if no quiz data is found
      navigate('/');
    }
  }, [navigate]);

  const handleOptionSelect = (option) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
  };

  const handleShortAnswerChange = (e) => {
    if (isAnswered) return;
    setSelectedAnswer(e.target.value);
  };

  const checkAnswer = () => {
    if (!selectedAnswer) return;
    
    const currentQuestion = quiz.questions[currentQuestionIndex];
    let isCorrect = false;
    
    if (currentQuestion.type === 'multiple-choice') {
      isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === 'true-false') {
      const booleanAnswer = selectedAnswer === 'true' ? true : selectedAnswer === 'false' ? false : selectedAnswer;
      isCorrect = booleanAnswer === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === 'short-answer') {
      // Case-insensitive comparison for short answers
      isCorrect = selectedAnswer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim();
    }
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // Update userAnswers array
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = {
      answer: selectedAnswer,
      isCorrect
    };
    setUserAnswers(newUserAnswers);
    
    setIsAnswered(true);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowExplanation(false);
    setUserAnswers(new Array(quiz.questions.length).fill(null));
    setQuizCompleted(false);
  };

  const backToHome = () => {
    navigate('/');
  };

  if (!quiz) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const percentageScore = Math.round((score / quiz.questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-white p-4 md:p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-indigo-600 p-6 text-white">
            <h1 className="text-2xl font-bold text-center">Quiz Results</h1>
            <p className="text-indigo-100 text-center mt-2">{quiz.topic}</p>
          </div>
          
          <div className="p-6">
            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-indigo-600 mb-2">{score}/{quiz.questions.length}</div>
              <div className="text-xl font-medium text-gray-700">{percentageScore}% Score</div>
              
              <div className="mt-6 flex justify-center">
                <div className="w-64 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      percentageScore >= 80 ? 'bg-green-500' : 
                      percentageScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${percentageScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Question Summary</h2>
              
              {quiz.questions.map((question, index) => (
                <div 
                  key={question.id} 
                  className={`p-4 rounded-lg border ${
                    userAnswers[index]?.isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'
                  }`}
                >
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      {userAnswers[index]?.isCorrect ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <X className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Q{index + 1}: {question.question}</p>
                      <p className="text-sm mt-1">
                        <span className="font-medium">Your answer:</span> {userAnswers[index]?.answer || 'No answer'}
                      </p>
                      {!userAnswers[index]?.isCorrect && (
                        <p className="text-sm mt-1 text-green-700">
                          <span className="font-medium">Correct answer:</span> {question.correctAnswer.toString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={restartQuiz}
                className="py-3 px-6 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Restart Quiz
              </button>
              <button
                onClick={backToHome}
                className="py-3 px-6 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                New Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white">
          <button 
            onClick={backToHome}
            className="mb-4 flex items-center text-indigo-100 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Generator
          </button>
          <h1 className="text-2xl font-bold text-center">{quiz.topic}</h1>
          <p className="text-indigo-100 text-center mt-2">
            {quiz.description} • {quiz.difficulty} Level
          </p>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-indigo-100">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </div>
            <div className="text-sm text-indigo-100">
              Score: {score}/{currentQuestionIndex}
            </div>
          </div>
          <div className="mt-2 w-full bg-indigo-400 bg-opacity-40 h-1.5 rounded-full">
            <div 
              className="bg-white h-full rounded-full" 
              style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                currentQuestion.type === 'multiple-choice' ? 'bg-blue-100 text-blue-800' :
                currentQuestion.type === 'true-false' ? 'bg-green-100 text-green-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {currentQuestion.type === 'multiple-choice' ? 'Multiple Choice' :
                 currentQuestion.type === 'true-false' ? 'True/False' : 'Short Answer'}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{currentQuestion.question}</h2>
          </div>
          
          {currentQuestion.type === 'multiple-choice' && (
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div 
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedAnswer === option ? 
                      isAnswered ? 
                        option === currentQuestion.correctAnswer ? 
                          'border-green-500 bg-green-50' : 
                          'border-red-500 bg-red-50' :
                        'border-indigo-500 bg-indigo-50' :
                      'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`h-5 w-5 mr-3 rounded-full border flex items-center justify-center ${
                      selectedAnswer === option ? 
                        isAnswered ? 
                          option === currentQuestion.correctAnswer ? 
                            'border-green-500 text-green-500' : 
                            'border-red-500 text-red-500' :
                          'border-indigo-500 text-indigo-500' :
                        'border-gray-400'
                    }`}>
                      {selectedAnswer === option && isAnswered && (
                        option === currentQuestion.correctAnswer ? 
                          <Check className="h-3 w-3" /> : 
                          <X className="h-3 w-3" />
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {currentQuestion.type === 'true-false' && (
            <div className="space-y-3">
              {['true', 'false'].map((option) => (
                <div 
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedAnswer === option ? 
                      isAnswered ? 
                        (option === 'true' ? true : false) === currentQuestion.correctAnswer ? 
                          'border-green-500 bg-green-50' : 
                          'border-red-500 bg-red-50' :
                        'border-indigo-500 bg-indigo-50' :
                      'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`h-5 w-5 mr-3 rounded-full border flex items-center justify-center ${
                      selectedAnswer === option ? 
                        isAnswered ? 
                          (option === 'true' ? true : false) === currentQuestion.correctAnswer ? 
                            'border-green-500 text-green-500' : 
                            'border-red-500 text-red-500' :
                          'border-indigo-500 text-indigo-500' :
                        'border-gray-400'
                    }`}>
                      {selectedAnswer === option && isAnswered && (
                        (option === 'true' ? true : false) === currentQuestion.correctAnswer ? 
                          <Check className="h-3 w-3" /> : 
                          <X className="h-3 w-3" />
                      )}
                    </div>
                    <span>{option === 'true' ? 'True' : 'False'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {currentQuestion.type === 'short-answer' && (
            <div>
              <input
                type="text"
                value={selectedAnswer || ''}
                onChange={handleShortAnswerChange}
                placeholder="Type your answer here..."
                disabled={isAnswered}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  isAnswered ? (
                    selectedAnswer?.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim() ?
                    'border-green-500 bg-green-50' :
                    'border-red-500 bg-red-50'
                  ) : 'border-gray-300'
                }`}
              />
              
              {isAnswered && (
                <div className="mt-4 p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <div className="font-medium text-gray-800">Correct Answer:</div>
                  <div className="mt-1">{currentQuestion.correctAnswer}</div>
                </div>
              )}
            </div>
          )}
          
          {showExplanation && (
            <div className="mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
              <div className="flex items-start">
                <HelpCircle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                <div>
                  <div className="font-medium text-indigo-800">Explanation:</div>
                  <div className="mt-1 text-indigo-700">{currentQuestion.explanation}</div>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-8 flex justify-between">
            {!isAnswered ? (
              <button
                onClick={checkAnswer}
                disabled={selectedAnswer === null}
                className={`py-3 px-6 rounded-lg font-medium ${
                  selectedAnswer === null ?
                  'bg-gray-200 text-gray-500 cursor-not-allowed' :
                  'bg-indigo-600 text-white hover:bg-indigo-700 transition-colors'
                }`}
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="py-3 px-6 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'See Results'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;