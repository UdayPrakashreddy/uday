import React, { useState } from 'react';
import StudentRow from './StudentRow';

const StudentTable = ({ students, onDeleteStudent }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rollNumber');
  const [sortOrder, setSortOrder] = useState('asc');

  // Filter students based on search term (roll number or name)
  const filteredStudents = students.filter((student) => {
    const term = searchTerm.toLowerCase();
    return (
      student.name.toLowerCase().includes(term) ||
      student.rollNumber.toString().includes(term)
    );
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
      <h2 className="panel-title">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="primary-text">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        Student Records
      </h2>

      {/* Toolbar for Search and Sort */}
      <div className="table-toolbar">
        <div className="search-wrapper">
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

      {/* Student Table */}
      {sortedStudents.length > 0 ? (
        <div className="table-responsive">
          <table className="student-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Marks</th>
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
              : 'Try adjusting your search query to find matching students.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
