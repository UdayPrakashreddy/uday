import React from 'react';

const StatsCards = ({ students }) => {
  const totalStudents = students.length;
  
  const averageMarks = totalStudents > 0
    ? (students.reduce((sum, s) => sum + Number(s.marks), 0) / totalStudents).toFixed(1)
    : 0;

  const topScorer = totalStudents > 0
    ? students.reduce((max, s) => Number(s.marks) > Number(max.marks) ? s : max, students[0])
    : null;

  const passCount = students.filter(s => Number(s.marks) >= 40).length;
  const passPercentage = totalStudents > 0
    ? Math.round((passCount / totalStudents) * 100)
    : 0;

  return (
    <div className="stats-grid">
      {/* Total Students */}
      <div className="stat-card">
        <div className="stat-icon-wrapper info">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <div className="stat-content">
          <h3>Total Students</h3>
          <div className="stat-value">{totalStudents}</div>
        </div>
      </div>

      {/* Average Marks */}
      <div className="stat-card">
        <div className="stat-icon-wrapper primary">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
        </div>
        <div className="stat-content">
          <h3>Class Average</h3>
          <div className="stat-value">{averageMarks} <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-secondary)' }}>/100</span></div>
        </div>
      </div>

      {/* Top Scorer */}
      <div className="stat-card">
        <div className="stat-icon-wrapper warning">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="7"></circle>
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
          </svg>
        </div>
        <div className="stat-content">
          <h3>Top Scorer</h3>
          <div className="stat-value" style={{ fontSize: topScorer && topScorer.name.length > 8 ? '1.35rem' : '1.75rem' }}>
            {topScorer ? `${topScorer.name} (${topScorer.marks})` : 'N/A'}
          </div>
        </div>
      </div>

      {/* Passing Percentage */}
      <div className="stat-card">
        <div className="stat-icon-wrapper success">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <div className="stat-content">
          <h3>Passing Rate</h3>
          <div className="stat-value">{passPercentage}%</div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
