import React, { useState, useEffect } from 'react';

const StudentRow = ({ student, onDelete }) => {
  const { rollNumber, name, marks, attendance } = student;
  const [confirmDelete, setConfirmDelete] = useState(false);

  const isPass = marks >= 40;
  const progressColor = isPass ? 'var(--success)' : 'var(--danger)';

  // Reset confirm state after 3 seconds if not clicked
  useEffect(() => {
    let timer;
    if (confirmDelete) {
      timer = setTimeout(() => {
        setConfirmDelete(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [confirmDelete]);

  const handleDeleteClick = () => {
    if (confirmDelete) {
      onDelete(rollNumber);
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <tr>
      <td>
        <span className="roll-badge">{rollNumber}</span>
      </td>
      <td className="name-cell">{name}</td>
      <td>
        <div className="marks-wrapper">
          <span className={`marks-badge ${isPass ? 'pass' : 'fail'}`}>
            {marks}
          </span>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{
                width: `${marks}%`,
                backgroundColor: progressColor
              }}
            />
          </div>
        </div>
      </td>
      <td>
        <div className="attendance-wrapper">
          <span className="attendance-badge good">
            {attendance}%
          </span>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{
                width: `${attendance}%`,
                backgroundColor: 'var(--success)'
              }}
            />
          </div>
        </div>
      </td>
      <td style={{ textAlign: 'center' }}>
        <button
          onClick={handleDeleteClick}
          className="btn-delete"
          title={confirmDelete ? "Click again to confirm" : "Delete record"}
          style={confirmDelete ? { color: 'var(--danger)', background: 'var(--danger-glow)', width: 'auto', padding: '0 0.5rem' } : {}}
        >
          {confirmDelete ? (
            <span style={{ fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
              <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Confirm?
            </span>
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          )}
        </button>
      </td>
    </tr>
  );
};

export default StudentRow;
