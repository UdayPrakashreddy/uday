import React, { useState, useEffect } from 'react';
import StatsCards from './components/StatsCards';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';

// Initial seed mock data for premium appearance from the start
const INITIAL_STUDENTS = [
  { rollNumber: 101, name: 'Alice Vance', marks: 92, attendance: 88 },
  { rollNumber: 102, name: 'Bob Sterling', marks: 78, attendance: 95 },
  { rollNumber: 103, name: 'Charlie Miller', marks: 35, attendance: 76 }, // Fail student to test conditional rendering
  { rollNumber: 104, name: 'Diana Prince', marks: 85, attendance: 90 }
];

function App() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('sms_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [toast, setToast] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('sms_theme') || 'light';
  });
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem('sms_view') || 'table';
  });

  // Sync students to local storage
  useEffect(() => {
    localStorage.setItem('sms_students', JSON.stringify(students));
  }, [students]);

  // Sync theme to local storage and document body class
  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : '';
    localStorage.setItem('sms_theme', theme);
  }, [theme]);

  // Sync viewMode to local storage
  useEffect(() => {
    localStorage.setItem('sms_view', viewMode);
  }, [viewMode]);

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

  const handleSeedMockData = () => {
    const mockFirstNames = ['Eva', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack', 'Liam', 'Mia', 'Nora', 'Oscar', 'Penelope', 'Quinn', 'Ruby', 'Sam', 'Tessa'];
    const mockLastNames = ['Greenwood', 'Wright', 'Hopper', 'Ford', 'Lin', 'Sparrow', 'Neeson', 'Wallace', 'Cruz', 'Davis', 'Evans', 'Foster', 'Gomez', 'Harris', 'Irwin'];
    
    let currentRolls = students.map(s => Number(s.rollNumber));
    let nextRoll = Math.max(100, ...currentRolls) + 1;
    if (nextRoll === -Infinity || nextRoll < 101) nextRoll = 101;
    
    const newMockStudents = [];
    for (let i = 0; i < 5; i++) {
      const first = mockFirstNames[Math.floor(Math.random() * mockFirstNames.length)];
      const last = mockLastNames[Math.floor(Math.random() * mockLastNames.length)];
      const fullName = `${first} ${last}`;
      
      while (currentRolls.includes(nextRoll)) {
        nextRoll++;
      }
      
      const randomMarks = Math.floor(Math.random() * 65) + 35; // 35 to 100
      const randomAttendance = Math.floor(Math.random() * 25) + 75; // 75 to 100
      newMockStudents.push({
        rollNumber: nextRoll,
        name: fullName,
        marks: randomMarks,
        attendance: randomAttendance
      });
      currentRolls.push(nextRoll);
      nextRoll++;
    }
    
    setStudents([...students, ...newMockStudents]);
    setToast({
      message: `Generated 5 premium student profiles!`,
      type: 'success'
    });
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete ALL student records?")) {
      setStudents([]);
      setToast({
        message: `Cleared all student records.`,
        type: 'info'
      });
    }
  };

  return (
    <div className="app-container">
      {/* Theme Toggler in Header */}
      <button 
        className="control-btn theme-btn" 
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        title={`Switch to ${theme === 'dark' ? 'Light Mode' : 'Dark Mode'}`}
      >
        {theme === 'dark' ? (
          /* Sun Icon */
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--warning)' }}>
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        ) : (
          /* Moon Icon */
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}>
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        )}
      </button>

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

      {/* Bulk controls and view switcher above main grid */}
      <div className="bulk-actions">
        <button className="bulk-btn" onClick={handleSeedMockData}>
          <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Quick Seed (5 Students)
        </button>
        {students.length > 0 && (
          <button className="bulk-btn danger-hover" onClick={handleClearAll}>
            <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            Clear All
          </button>
        )}
      </div>

      {/* Dashboard Main Grid Layout */}
      <main className="dashboard-grid">
        {/* Left Side: Add Record Form */}
        <section className="form-section">
          <StudentForm onAddStudent={handleAddStudent} students={students} />
        </section>

        {/* Right Side: Interactive Table or Card Grid */}
        <section className="table-section">
          <StudentTable 
            students={students} 
            onDeleteStudent={handleDeleteStudent} 
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        </section>
      </main>

      {/* Floating Toast Notification */}
      {toast && (
        <div className="toast-alert" style={{ borderColor: toast.type === 'info' ? 'var(--info)' : 'var(--success)' }}>
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className={toast.type === 'info' ? 'info-text' : 'success-text'}>
            {toast.type === 'info' ? (
              <>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </>
            ) : (
              <polyline points="20 6 9 17 4 12"></polyline>
            )}
          </svg>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}

export default App;
