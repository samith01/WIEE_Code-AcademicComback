import { useState } from "react";

export default function Assignment({ courseName, onBack }) {
  // Sample assignments data for different courses
  const getAssignmentsForCourse = (course) => {
    const assignmentsData = {
      "Computer Science 101": [
        { id: 1, title: "Hello World Program", dueDate: "Nov 25, 2025", status: "pending", description: "Write your first Python program" },
        { id: 2, title: "Variables and Data Types", dueDate: "Nov 28, 2025", status: "completed", description: "Learn about different data types" },
        { id: 3, title: "Control Structures", dueDate: "Dec 2, 2025", status: "pending", description: "Implement loops and conditionals" }
      ],
      "Data Structures": [
        { id: 1, title: "Array Implementation", dueDate: "Nov 24, 2025", status: "pending", description: "Implement dynamic arrays" },
        { id: 2, title: "Linked List Operations", dueDate: "Nov 30, 2025", status: "pending", description: "Create and manipulate linked lists" },
        { id: 3, title: "Stack and Queue", dueDate: "Dec 5, 2025", status: "pending", description: "Implement LIFO and FIFO structures" }
      ],
      "Linear Algebra": [
        { id: 1, title: "Matrix Operations", dueDate: "Nov 26, 2025", status: "pending", description: "Solve matrix multiplication problems" },
        { id: 2, title: "Vector Spaces", dueDate: "Dec 1, 2025", status: "pending", description: "Understanding vector space properties" },
        { id: 3, title: "Eigenvalues", dueDate: "Dec 8, 2025", status: "pending", description: "Calculate eigenvalues and eigenvectors" }
      ],
      "Web Development": [
        { id: 1, title: "HTML Structure", dueDate: "Nov 23, 2025", status: "completed", description: "Create semantic HTML pages" },
        { id: 2, title: "CSS Styling", dueDate: "Nov 27, 2025", status: "completed", description: "Style web pages with CSS" },
        { id: 3, title: "JavaScript Basics", dueDate: "Dec 3, 2025", status: "pending", description: "Add interactivity with JavaScript" }
      ],
      "Database Systems": [
        { id: 1, title: "ER Diagram", dueDate: "Nov 29, 2025", status: "pending", description: "Design entity-relationship diagrams" },
        { id: 2, title: "SQL Queries", dueDate: "Dec 4, 2025", status: "pending", description: "Write complex SQL queries" },
        { id: 3, title: "Database Normalization", dueDate: "Dec 10, 2025", status: "pending", description: "Normalize database schemas" }
      ],
      "Machine Learning": [
        { id: 1, title: "Linear Regression", dueDate: "Nov 25, 2025", status: "completed", description: "Implement linear regression from scratch" },
        { id: 2, title: "Neural Network", dueDate: "Dec 1, 2025", status: "pending", description: "Build a simple neural network" },
        { id: 3, title: "Model Evaluation", dueDate: "Dec 7, 2025", status: "pending", description: "Evaluate model performance metrics" }
      ]
    };
    return assignmentsData[course] || [];
  };

  const [assignments] = useState(getAssignmentsForCourse(courseName));
  const [newAssignment, setNewAssignment] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [assignmentsList, setAssignmentsList] = useState(assignments);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const addAssignment = () => {
    if (newAssignment.trim() && uploadedFile && newDueDate) {
      const newTask = {
        id: Date.now(),
        title: newAssignment.trim(),
        dueDate: new Date(newDueDate).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
        status: "pending",
        description: "Custom assignment",
        uploadedFile: uploadedFile
      };
      setAssignmentsList([...assignmentsList, newTask]);
      setNewAssignment("");
      setNewDueDate("");
      setUploadedFile(null);
    }
  };

  const handleNewFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf') {
        setUploadedFile(file.name);
      } else {
        alert('Please drop a PDF file');
      }
    }
  };

  const toggleStatus = (id) => {
    setAssignmentsList(assignmentsList.map(assignment =>
      assignment.id === id
        ? { ...assignment, status: assignment.status === 'completed' ? 'pending' : 'completed' }
        : assignment
    ));
  };

  const handleFileUpload = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      setAssignmentsList(assignmentsList.map(assignment =>
        assignment.id === id
          ? { ...assignment, uploadedFile: file.name }
          : assignment
      ));
    }
  };

  const getStatusColor = (status) => {
    return status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  const getStatusIcon = (status) => {
    return status === 'completed' ? '✅' : '⏳';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200 mr-4"
          >
            <span className="text-xl mr-2">←</span>
            Back to Courses
          </button>
          <h1 className="text-3xl font-bold text-gray-800">
            {courseName} - Assignments
          </h1>
        </div>

        {/* Add Assignment Input */}
        <div className="mb-8 max-w-4xl">
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={newAssignment}
              onChange={(e) => setNewAssignment(e.target.value)}
              placeholder="Add new assignment"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && addAssignment()}
            />
            
            <input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min={new Date().toISOString().split('T')[0]}
            />
            
            <button
              onClick={addAssignment}
              disabled={!uploadedFile || !newAssignment.trim() || !newDueDate}
              className={`px-6 py-2 rounded-lg transition-colors duration-200 font-medium ${
                uploadedFile && newAssignment.trim() && newDueDate
                  ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Create Plan
            </button>
          </div>
          
          {/* Drag and Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              dragOver 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="text-4xl mb-3">📁</div>
            <p className="text-gray-600 font-medium mb-1">
              Drag and drop your PDF file here
            </p>
            <p className="text-sm text-gray-500">
              Assignment name, due date, and PDF upload required to create a plan
            </p>
            
            {/* Show uploaded file for new assignment */}
            {uploadedFile && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700 font-medium">
                  📄 File ready: {uploadedFile}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Assignment Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center">
              <span className="text-2xl mr-3">📝</span>
              <div>
                <p className="text-2xl font-bold text-gray-800">{assignmentsList.length}</p>
                <p className="text-gray-600 text-sm">Total Assignments</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center">
              <span className="text-2xl mr-3">✅</span>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {assignmentsList.filter(a => a.status === 'completed').length}
                </p>
                <p className="text-gray-600 text-sm">Completed</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center">
              <span className="text-2xl mr-3">⏳</span>
              <div>
                <p className="text-2xl font-bold text-yellow-600">
                  {assignmentsList.filter(a => a.status === 'pending').length}
                </p>
                <p className="text-gray-600 text-sm">Pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          {assignmentsList.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-6xl">📝</span>
              <p className="text-gray-500 mt-4">No assignments yet. Add one above!</p>
            </div>
          ) : (
            assignmentsList.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {assignment.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                        {getStatusIcon(assignment.status)} {assignment.status}
                      </span>
                    </div>
                    
                    {/* Show uploaded file name */}
                    {assignment.uploadedFile && (
                      <p className="text-sm text-green-600 mb-2">
                        📄 Uploaded: {assignment.uploadedFile}
                      </p>
                    )}
                    
                    <p className="text-gray-600 mb-2">{assignment.description}</p>
                    <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
                  </div>
                  <div className="ml-4 flex gap-2">
                    <button
                      onClick={() => toggleStatus(assignment.id)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 text-sm font-medium"
                    >
                      Mark as {assignment.status === 'completed' ? 'Pending' : 'Complete'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}