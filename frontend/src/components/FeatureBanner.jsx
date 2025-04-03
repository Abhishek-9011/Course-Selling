import { CalendarDays, Map, ListChecks, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const FeatureBanner = () => {
  return (
    <div className="bg-white rounded-xl p-6      border-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 pb-6 text-center">
          Supercharge Your Productivity
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Timetable Feature */}
          <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center text-center border border-gray-200 hover:border-blue-300 transition">
            <div className="bg-blue-100 p-4 rounded-full pb-4">
              <CalendarDays className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 pb-2">
              Smart Timetable
            </h3>
            <p className="text-gray-600 pb-4">
              Generate personalized schedules that optimize your time and boost
              efficiency.
            </p>
            <Link to={"/timetable-form"} className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition">
              Create Timetable
            </Link>
          </div>

          {/* Roadmap Feature */}
          <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center text-center border border-gray-200 hover:border-purple-300 transition">
            <div className="bg-purple-100 p-4 rounded-full pb-4">
              <Map className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 pb-2">
              Custom Roadmaps
            </h3>
            <p className="text-gray-600 pb-4">
              Visualize your goals with step-by-step roadmaps tailored to your
              needs.
            </p>
            <Link to={"/roadmap-form"} className="mt-auto bg-purple-600 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 transition">
              Build Roadmap
            </Link>
          </div>

          {/* Quiz Feature */}
          <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center text-center border border-gray-200 hover:border-green-300 transition">
            <div className="bg-green-100 p-4 rounded-full pb-4">
              <ListChecks className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 pb-2">
              Interactive Quizzes
            </h3>
            <p className="text-gray-600 pb-4">
              Test your knowledge with auto-generated quizzes on any topic.
            </p>
            <Link to={"/quiz-form"} className="mt-auto bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition">
              Generate Quiz
            </Link>
          </div>
        </div>

        <div className="pt-8 text-center">
          <button className="flex items-center justify-center mx-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:from-blue-600 hover:to-blue-700 transition shadow-md">
            <Rocket className="h-5 w-5 mr-2" />
            Get Started - It's Free!
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureBanner;
