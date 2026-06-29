import React, { useState, useEffect } from 'react';
import StatsCards from './components/StatsCards';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';

// Initial seed mock data for premium appearance from the start
const INITIAL_STUDENTS = [
  { rollNumber: 101, name: 'Alice Vance', marks: 92 },
  { rollNumber: 102, name: 'Bob Sterling', marks: 78 },
  { rollNumber: 103, name: 'Charlie Miller', marks: 35 }, // Fail student to test condition rendering and indicators
  { rollNumber: 104, name: 'Diana Prince', marks: 85 }
];

function App() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('sms_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [toast, setToast] = useState(null);

  // Sync to local storage for user convenience
  useEffect(() => {
    localStorage.setItem('sms_students', JSON.stringify(students));
  }, [students]);

  // Clear toast notifications after 3 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleAddStudent = (newStudent) => {
    setStudents([...students, newStudent]);
    setToast({
      message: `Successfully added student: ${newStudent.name}`,
      type: 'success'
    });
  };

  const handleDeleteStudent = (rollNumber) => {
    const studentToDelete = students.find(s => s.rollNumber === rollNumber);
    setStudents(students.filter((student) => student.rollNumber !== rollNumber));
    setToast({
      message: `Deleted record for ${studentToDelete ? studentToDelete.name : 'Roll No ' + rollNumber}`,
      type: 'success'
    });
  };

  return (
    <div className="app-container">
      {/* Header Section */}
      <header>
        <div className="logo-section">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M12 2L1 9l11 7l9-5.73V17h2V9L12 2zm0 11.5L4.75 9L12 5.5l7.25 3.5L12 13.5z" />
            </svg>
          </div>
          <h1 className="app-title">Student Management System</h1>
        </div>
        <p className="app-subtitle">Academic Performance Tracker & Student Directory Dashboard</p>
      </header>

      {/* Aggregate Statistics Cards */}
      <StatsCards students={students} />

      {/* Dashboard Main Grid Layout */}
      <main className="dashboard-grid">
        {/* Left Side: Add Record Form */}
        <section className="form-section">
          <StudentForm onAddStudent={handleAddStudent} students={students} />
        </section>

        {/* Right Side: Interactive Table */}
        <section className="table-section">
          <StudentTable students={students} onDeleteStudent={handleDeleteStudent} />
        </section>
      </main>

      {/* Floating Toast Notification */}
      {toast && (
        <div className="toast-alert">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="success-text">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}

export default App;
