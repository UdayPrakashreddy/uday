import React, { useState } from 'react';

const StudentForm = ({ onAddStudent, students }) => {
  const [rollNumber, setRollNumber] = useState('');
  const [name, setName] = useState('');
  const [marks, setMarks] = useState('');
  const [attendance, setAttendance] = useState('');
  const [errors, setErrors] = useState({});
  const [isShaking, setIsShaking] = useState(false);

  const validate = () => {
    const newErrors = {};

    // Roll Number validation (Number only)
    if (!rollNumber) {
      newErrors.rollNumber = 'Roll Number is required';
    } else if (!/^\d+$/.test(rollNumber)) {
      newErrors.rollNumber = 'Roll Number must contain digits only';
    } else {
      const rollNumValue = Number(rollNumber);
      if (rollNumValue <= 0) {
        newErrors.rollNumber = 'Roll Number must be greater than zero';
      } else {
        const isDuplicate = students.some(s => Number(s.rollNumber) === rollNumValue);
        if (isDuplicate) {
          newErrors.rollNumber = 'Roll Number already exists';
        }
      }
    }

    // Name validation (Letters only)
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      newErrors.name = 'Name must contain letters only';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Marks validation (0-100)
    if (!marks && marks !== 0) {
      newErrors.marks = 'Marks are required';
    } else {
      const marksValue = Number(marks);
      if (isNaN(marksValue) || marksValue < 0 || marksValue > 100) {
        newErrors.marks = 'Marks must be between 0 and 100';
      }
    }

    // Attendance validation (Min 75%)
    if (!attendance && attendance !== 0) {
      newErrors.attendance = 'Attendance is required';
    } else {
      const attValue = Number(attendance);
      if (isNaN(attValue) || attValue < 75 || attValue > 100) {
        newErrors.attendance = 'Attendance must be between 75% and 100%';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onAddStudent({
        rollNumber: Number(rollNumber),
        name: name.trim(),
        marks: Number(marks),
        attendance: Number(attendance)
      });
      // Clear inputs
      setRollNumber('');
      setName('');
      setMarks('');
      setAttendance('');
      setErrors({});
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className={`glass-panel ${isShaking ? 'shake' : ''}`}>
      <h2 className="panel-title">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="info-text">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="8.5" cy="7" r="4"></circle>
          <line x1="20" y1="8" x2="20" y2="14"></line>
          <line x1="23" y1="11" x2="17" y2="11"></line>
        </svg>
        Add New Student
      </h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Roll Number Input */}
        <div className="form-group">
          <label className="form-label" htmlFor="rollNumber">Roll Number (Digits Only)</label>
          <div className="input-wrapper">
            <span className="input-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </span>
            <input
              type="text"
              id="rollNumber"
              className={`input-field ${errors.rollNumber ? 'error-border' : ''}`}
              placeholder="e.g. 101"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
            />
          </div>
          {errors.rollNumber && (
            <span className="error-text">
              <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {errors.rollNumber}
            </span>
          )}
        </div>

        {/* Name Input */}
        <div className="form-group">
          <label className="form-label" htmlFor="studentName">Student Name (Letters Only)</label>
          <div className="input-wrapper">
            <span className="input-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </span>
            <input
              type="text"
              id="studentName"
              className={`input-field ${errors.name ? 'error-border' : ''}`}
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {errors.name && (
            <span className="error-text">
              <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {errors.name}
            </span>
          )}
        </div>

        {/* Marks Input */}
        <div className="form-group">
          <label className="form-label" htmlFor="studentMarks">Marks Obtained (0 - 100)</label>
          <div className="input-wrapper">
            <span className="input-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </span>
            <input
              type="number"
              id="studentMarks"
              className={`input-field ${errors.marks ? 'error-border' : ''}`}
              placeholder="e.g. 85"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
            />
          </div>
          {errors.marks && (
            <span className="error-text">
              <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {errors.marks}
            </span>
          )}
        </div>

        {/* Attendance Input */}
        <div className="form-group">
          <label className="form-label" htmlFor="studentAttendance">Attendance Percentage (Min 75%)</label>
          <div className="input-wrapper">
            <span className="input-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </span>
            <input
              type="number"
              id="studentAttendance"
              className={`input-field ${errors.attendance ? 'error-border' : ''}`}
              placeholder="e.g. 85"
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
            />
          </div>
          {errors.attendance && (
            <span className="error-text">
              <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {errors.attendance}
            </span>
          )}
        </div>

        <button type="submit" className="btn-primary">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Student Record
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
