import React, { useState, useEffect } from 'react';
import StudentRow from './StudentRow';

const getAvatarColor = (marks) => {
  if (marks >= 85) return 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)';
  if (marks >= 70) return 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)';
  if (marks >= 50) return 'linear-gradient(135deg, #10b981 0%, #34d399 100%)';
  if (marks >= 40) return 'linear-gradient(135deg, #fbbf24 0%, #fcd34d 100%)';
  return 'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)';
};

const StudentCardItem = ({ student, onDelete }) => {
  const { rollNumber, name, marks, attendance } = student;
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    let timer;
    if (confirmDelete) {
      timer = setTimeout(() => setConfirmDelete(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [confirmDelete]);

  const isPass = marks >= 40;
  const progressColor = isPass ? 'var(--success)' : 'var(--danger)';
  
  // Get initials
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="student-card">
      <div className="card-header">
        <div className="card-identity">
          <div className="card-avatar" style={{ background: getAvatarColor(marks) }}>
            {initials || '?'}
          </div>
          <div className="card-info">
            <span className="card-name">{name}</span>
            <span className="card-roll">Roll No: {rollNumber}</span>
          </div>
        </div>
        
        <button
          onClick={() => confirmDelete ? onDelete(rollNumber) : setConfirmDelete(true)}
          className="btn-delete"
          style={confirmDelete ? { color: 'var(--danger)', background: 'var(--danger-glow)', width: 'auto', padding: '0 0.5rem', borderRadius: 'var(--radius-sm)' } : {}}
          title={confirmDelete ? "Click to confirm deletion" : "Delete record"}
        >
          {confirmDelete ? (
            <span style={{ fontSize: '0.7rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
              Confirm?
            </span>
          ) : (
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          )}
        </button>
      </div>

      <div className="card-performance">
        <div className="card-perf-text">
          <span>Score</span>
          <span style={{ fontWeight: 600, color: isPass ? 'var(--success)' : 'var(--danger)' }}>
            {marks} / 100 ({isPass ? 'PASS' : 'FAIL'})
          </span>
        </div>
        <div className="progress-bar-container" style={{ width: '100%' }}>
          <div
            className="progress-bar"
            style={{
              width: `${marks}%`,
              backgroundColor: progressColor
            }}
          />
        </div>

        <div className="card-perf-text" style={{ marginTop: '0.5rem' }}>
          <span>Attendance</span>
          <span style={{ fontWeight: 600, color: 'var(--success)' }}>
            {attendance}%
          </span>
        </div>
        <div className="progress-bar-container" style={{ width: '100%' }}>
          <div
            className="progress-bar"
            style={{
              width: `${attendance}%`,
              backgroundColor: 'var(--success)'
            }}
          />
        </div>
      </div>
    </div>
  );
};

const StudentTable = ({ students, onDeleteStudent, viewMode, setViewMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rollNumber');
  const [sortOrder, setSortOrder] = useState('asc');
  const [gradeFilter, setGradeFilter] = useState('ALL');

  // Filter students based on search term (roll number or name)
  const searchedStudents = students.filter((student) => {
    const term = searchTerm.toLowerCase();
    return (
      student.name.toLowerCase().includes(term) ||
      student.rollNumber.toString().includes(term)
    );
  });

  // Filter by grade band
  const filteredStudents = searchedStudents.filter(student => {
    if (gradeFilter === 'ALL') return true;
    const m = Number(student.marks);
    if (gradeFilter === 'A') return m >= 85;
    if (gradeFilter === 'B') return m >= 70 && m < 85;
    if (gradeFilter === 'C') return m >= 50 && m < 70;
    if (gradeFilter === 'D') return m >= 40 && m < 50;
    if (gradeFilter === 'F') return m < 40;
    return true;
  });

  // Sort students
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];

    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSortChange = (e) => {
    const value = e.target.value;
    const [field, order] = value.split('-');
    setSortBy(field);
    setSortOrder(order);
  };

  return (
    <div className="glass-panel" style={{ height: 'fit-content' }}>
      <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.75rem' }}>
        <h2 className="panel-title" style={{ margin: 0, border: 'none', padding: 0 }}>
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="primary-text">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
          </svg>
          Student Directory
        </h2>
        
        {/* Toggle between Table and Cards */}
        <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.15)', padding: '4px', borderRadius: '10px' }}>
          <button 
            onClick={() => setViewMode('table')}
            style={{ 
              background: viewMode === 'table' ? 'var(--primary)' : 'transparent', 
              color: viewMode === 'table' ? '#fff' : 'var(--text-secondary)',
              border: 'none', padding: '0.35rem 0.65rem', borderRadius: '7px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600, transition: 'all 0.2s'
            }}
          >
            <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            Table
          </button>
          <button 
            onClick={() => setViewMode('cards')}
            style={{ 
              background: viewMode === 'cards' ? 'var(--primary)' : 'transparent', 
              color: viewMode === 'cards' ? '#fff' : 'var(--text-secondary)',
              border: 'none', padding: '0.35rem 0.65rem', borderRadius: '7px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600, transition: 'all 0.2s'
            }}
          >
            <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Cards
          </button>
        </div>
      </div>

      {/* Toolbar for Search, Filter, and Sort */}
      <div className="table-toolbar" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        <div className="search-wrapper" style={{ flex: '1 1 200px' }}>
          <span className="search-icon">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            type="text"
            className="search-field"
            placeholder="Search by name or roll no..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Grade Filter Dropdown */}
        <div className="sort-wrapper">
          <label htmlFor="gradeSelect">Grade:</label>
          <select
            id="gradeSelect"
            className="select-field"
            onChange={(e) => setGradeFilter(e.target.value)}
            value={gradeFilter}
          >
            <option value="ALL">All Grades</option>
            <option value="A">Grade A (85-100)</option>
            <option value="B">Grade B (70-84)</option>
            <option value="C">Grade C (50-69)</option>
            <option value="D">Grade D (40-49)</option>
            <option value="F">Grade F (&lt;40)</option>
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="sort-wrapper">
          <label htmlFor="sortSelect">Sort By:</label>
          <select
            id="sortSelect"
            className="select-field"
            onChange={handleSortChange}
            value={`${sortBy}-${sortOrder}`}
          >
            <option value="rollNumber-asc">Roll Number (Asc)</option>
            <option value="rollNumber-desc">Roll Number (Desc)</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="marks-desc">Marks (High-Low)</option>
            <option value="marks-asc">Marks (Low-High)</option>
          </select>
        </div>
      </div>

      {/* Dynamic Student records list display */}
      {sortedStudents.length > 0 ? (
        viewMode === 'table' ? (
          <div className="table-responsive">
            <table className="student-table">
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Marks</th>
                  <th>Attendance</th>
                  <th style={{ textAlign: 'center', width: '80px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedStudents.map((student) => (
                  <StudentRow
                    key={student.rollNumber}
                    student={student}
                    onDelete={onDeleteStudent}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="student-grid">
            {sortedStudents.map((student) => (
              <StudentCardItem
                key={student.rollNumber}
                student={student}
                onDelete={onDeleteStudent}
              />
            ))}
          </div>
        )
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h3>No Student Records Found</h3>
          <p>
            {students.length === 0
              ? 'Get started by adding student details using the form on the left.'
              : 'Try adjusting your search query or grade filters.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
