import { useState } from "react";
import Assignment from "./Assignment";

export default function App() {
  const [courses, setCourses] = useState([
    "Computer Science 101",
    "Data Structures",
    "Linear Algebra", 
    "Web Development",
    "Database Systems",
    "Machine Learning"
  ]);
  const [newCourse, setNewCourse] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const addCourse = () => {
    if (newCourse.trim()) {
      setCourses([...courses, newCourse.trim()]);
      setNewCourse("");
    }
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
  };

  // If a course is selected, show the Assignment page
  if (selectedCourse) {
    return <Assignment courseName={selectedCourse} onBack={handleBackToCourses} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          My Courses
        </h1>
        
        {/* Add Course Input */}
        <div className="flex gap-3 mb-8 max-w-md mx-auto">
          <input
            type="text"
            value={newCourse}
            onChange={(e) => setNewCourse(e.target.value)}
            placeholder="Enter course name"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && addCourse()}
          />
          <button
            onClick={addCourse}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
          >
            Add
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course, index) => (
            <div
              key={index}
              onClick={() => handleCourseClick(course)}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-105"
            >
              <h3 className="text-lg font-semibold text-gray-800 text-center">
                {course}
              </h3>
              <p className="text-sm text-gray-500 text-center mt-2">
                Click to view assignments
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
