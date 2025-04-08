import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Target,
  BookOpen,
  Dumbbell,
  Coffee,
  Sun,
  Moon,
  CheckCircle,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ScheduleGeneratorForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    goals: [],
    wakeUpTime: "",
    sleepTime: "",
    workHours: "",
    studyTopics: [],
    exercisePreference: "",
    mealTimes: { breakfast: "", lunch: "", dinner: "" },
    weekendDifferent: true,
    specificActivities: [],
  });

  const [goalInput, setGoalInput] = useState("");
  const [studyTopicInput, setStudyTopicInput] = useState("");
  const [activityInput, setActivityInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  const totalSteps = 6;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    checkCompletion();
  };

  const handleMealTimeChange = (meal, value) => {
    setFormData((prev) => ({
      ...prev,
      mealTimes: {
        ...prev.mealTimes,
        [meal]: value,
      },
    }));
    checkCompletion();
  };

  const addItem = (type, value, setValue) => {
    if (value.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        [type]: [...prev[type], value.trim()],
      }));
      setValue("");
      checkCompletion();
    }
  };

  const removeItem = (type, index) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
    checkCompletion();
  };

  const checkCompletion = () => {
    const requiredFieldsFilled =
      formData.wakeUpTime &&
      formData.sleepTime &&
      formData.workHours &&
      formData.exercisePreference &&
      formData.mealTimes.breakfast &&
      formData.mealTimes.lunch &&
      formData.mealTimes.dinner;

    setShowSubmitButton(requiredFieldsFilled && currentStep === totalSteps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/course/timetable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goals: formData.goals,
          wakeUpTime: formData.wakeUpTime,
          sleepTime: formData.sleepTime,
          workHours: formData.workHours,
          studyTopics: formData.studyTopics,
          exercisePreference: formData.exercisePreference,
          mealTimes: formData.mealTimes,
          weekendDifferent: formData.weekendDifferent,
          specificActivities: formData.specificActivities,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate schedule");
      }

      const data = await response.json();

      // Store the generated timetable in localStorage to access it on the next page
      localStorage.setItem("generatedTimetable", JSON.stringify(data));

      // Redirect to the timetable display page
      navigate("/timetable");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate schedule. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      checkCompletion();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setShowSubmitButton(false);
    }
  };

  const steps = [
    { id: 1, title: "Sleep Schedule", icon: <Clock size={18} /> },
    { id: 2, title: "Goals", icon: <Target size={18} /> },
    { id: 3, title: "Work & Study", icon: <BookOpen size={18} /> },
    { id: 4, title: "Exercise", icon: <Dumbbell size={18} /> },
    { id: 5, title: "Meals", icon: <Coffee size={18} /> },
    { id: 6, title: "Activities", icon: <CheckCircle size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white text-center">
          <div className="flex items-center justify-center mb-4">
            <Calendar size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Daily Schedule Generator</h1>
          <p className="text-indigo-100 max-w-lg mx-auto">
            Create a personalized daily schedule in {totalSteps} simple steps
          </p>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 bg-white border-b border-gray-200">
          <div className="flex justify-between items-center">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                    currentStep >= step.id
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step.icon}
                </div>
                <span
                  className={`text-xs font-medium ${
                    currentStep >= step.id ? "text-indigo-600" : "text-gray-500"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Step 1: Sleep Schedule */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Your Sleep Schedule
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-indigo-50 p-5 rounded-xl">
                  <h3 className="text-lg font-semibold flex items-center mb-4">
                    <Sun className="w-5 h-5 mr-2 text-indigo-600" />
                    Wake Up Time
                  </h3>
                  <input
                    type="time"
                    name="wakeUpTime"
                    value={formData.wakeUpTime}
                    onChange={handleChange}
                    required
                    className="block w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="bg-indigo-50 p-5 rounded-xl">
                  <h3 className="text-lg font-semibold flex items-center mb-4">
                    <Moon className="w-5 h-5 mr-2 text-indigo-600" />
                    Sleep Time
                  </h3>
                  <input
                    type="time"
                    name="sleepTime"
                    value={formData.sleepTime}
                    onChange={handleChange}
                    required
                    className="block w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="bg-indigo-50 p-5 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Weekend Schedule</h3>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    id="weekendDifferent"
                    name="weekendDifferent"
                    checked={formData.weekendDifferent}
                    onChange={handleChange}
                    className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <span className="ml-3 text-gray-700">
                    Create a different schedule for weekends
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Step 2: Goals */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Your Daily Goals
              </h2>

              <div className="bg-indigo-50 p-5 rounded-xl">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={goalInput}
                    onChange={(e) => setGoalInput(e.target.value)}
                    placeholder="Add a goal (e.g., Read 30 pages, Meditate)"
                    className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => addItem("goals", goalInput, setGoalInput)}
                    className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 flex items-center"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {formData.goals.map((goal, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-full px-4 py-2 flex items-center shadow-sm"
                    >
                      <span className="text-sm">{goal}</span>
                      <button
                        type="button"
                        onClick={() => removeItem("goals", index)}
                        className="ml-2 text-gray-400 hover:text-red-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Work & Study */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Work & Study
              </h2>

              <div className="bg-indigo-50 p-5 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Work Hours</h3>
                <input
                  type="text"
                  name="workHours"
                  value={formData.workHours}
                  onChange={handleChange}
                  placeholder="e.g., 9:00-17:00 or Flexible"
                  required
                  className="block w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="bg-indigo-50 p-5 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Study Topics</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={studyTopicInput}
                    onChange={(e) => setStudyTopicInput(e.target.value)}
                    placeholder="Add a study topic (e.g., React, Spanish)"
                    className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      addItem(
                        "studyTopics",
                        studyTopicInput,
                        setStudyTopicInput
                      )
                    }
                    className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 flex items-center"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {formData.studyTopics.map((topic, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-full px-4 py-2 flex items-center shadow-sm"
                    >
                      <span className="text-sm">{topic}</span>
                      <button
                        type="button"
                        onClick={() => removeItem("studyTopics", index)}
                        className="ml-2 text-gray-400 hover:text-red-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Exercise */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Exercise Preferences
              </h2>

              <div className="bg-indigo-50 p-5 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">
                  When do you prefer to exercise?
                </h3>
                <select
                  name="exercisePreference"
                  value={formData.exercisePreference}
                  onChange={handleChange}
                  required
                  className="block w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select your preference...</option>
                  <option value="morning">Morning (6-9am)</option>
                  <option value="midday">Midday (11am-2pm)</option>
                  <option value="afternoon">Afternoon (3-6pm)</option>
                  <option value="evening">Evening (7-10pm)</option>
                  <option value="none">No Regular Exercise</option>
                </select>
                {formData.exercisePreference && (
                  <p className="mt-2 text-sm text-gray-600">
                    {formData.exercisePreference === "none"
                      ? "Your schedule won't include exercise time."
                      : `Your schedule will prioritize ${formData.exercisePreference} workouts.`}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Meals */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Meal Times
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-indigo-50 p-5 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">Breakfast</h3>
                  <input
                    type="time"
                    value={formData.mealTimes.breakfast}
                    onChange={(e) =>
                      handleMealTimeChange("breakfast", e.target.value)
                    }
                    required
                    className="block w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="bg-indigo-50 p-5 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">Lunch</h3>
                  <input
                    type="time"
                    value={formData.mealTimes.lunch}
                    onChange={(e) =>
                      handleMealTimeChange("lunch", e.target.value)
                    }
                    required
                    className="block w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="bg-indigo-50 p-5 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">Dinner</h3>
                  <input
                    type="time"
                    value={formData.mealTimes.dinner}
                    onChange={(e) =>
                      handleMealTimeChange("dinner", e.target.value)
                    }
                    required
                    className="block w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Activities */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Specific Activities
              </h2>

              <div className="bg-indigo-50 p-5 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">
                  Add any specific activities
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={activityInput}
                    onChange={(e) => setActivityInput(e.target.value)}
                    placeholder="Add an activity (e.g., Meditation, Reading, Journaling)"
                    className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      addItem(
                        "specificActivities",
                        activityInput,
                        setActivityInput
                      )
                    }
                    className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 flex items-center"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {formData.specificActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg px-4 py-3 flex items-center justify-between shadow-sm"
                    >
                      <span>{activity}</span>
                      <button
                        type="button"
                        onClick={() => removeItem("specificActivities", index)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-10 flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <ChevronLeft size={18} className="mr-2" />
                Previous
              </button>
            )}

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Next
                <ChevronRight size={18} className="ml-2" />
              </button>
            ) : showSubmitButton ? null : (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Review
                <ChevronRight size={18} className="ml-2" />
              </button>
            )}
          </div>

          {/* Submit Button (only shown after all steps are completed) */}
          {showSubmitButton && (
            <div className="mt-8 text-center">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full max-w-md mx-auto py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all ${
                  isLoading
                    ? "bg-indigo-400"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating Your Schedule...
                  </div>
                ) : (
                  "Generate My Perfect Schedule"
                )}
              </button>
              <p className="mt-2 text-sm text-gray-500">
                Review your information before generating
              </p>
            </div>
          )}
        </form>

        <div className="px-8 py-5 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
          <p className="text-sm text-gray-600 text-center">
            Step {currentStep} of {totalSteps} •{" "}
            {Math.round((currentStep / totalSteps) * 100)}% complete
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScheduleGeneratorForm;
