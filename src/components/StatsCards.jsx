import React from 'react';

const StatsCards = ({ students }) => {
  const totalStudents = students.length;
  
  const averageMarks = totalStudents > 0
    ? (students.reduce((sum, s) => sum + Number(s.marks), 0) / totalStudents).toFixed(1)
    : 0;

  const topScorer = totalStudents > 0
    ? students.reduce((max, s) => Number(s.marks) > Number(max.marks) ? s : max, students[0])
    : null;

  const averageAttendance = totalStudents > 0
    ? (students.reduce((sum, s) => sum + Number(s.attendance || 0), 0) / totalStudents).toFixed(1)
    : 0;

  // Grade bounds:
  // A: 85 - 100
  // B: 70 - 84
  // C: 50 - 69
  // D: 40 - 49
  // F: < 40
  const distribution = {
    A: { count: 0, label: 'Excellent (85-100)' },
    B: { count: 0, label: 'Good (70-84)' },
    C: { count: 0, label: 'Average (50-69)' },
    D: { count: 0, label: 'Pass (40-49)' },
    F: { count: 0, label: 'Fail (<40)' }
  };

  students.forEach(s => {
    const m = Number(s.marks);
    if (m >= 85) distribution.A.count++;
    else if (m >= 70) distribution.B.count++;
    else if (m >= 50) distribution.C.count++;
    else if (m >= 40) distribution.D.count++;
    else distribution.F.count++;
  });

  const maxCount = Math.max(...Object.values(distribution).map(g => g.count), 0);

  return (
    <>
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
            <div className="stat-value" style={{ fontSize: topScorer && topScorer.name.length > 12 ? '1.25rem' : '1.75rem' }}>
              {topScorer ? `${topScorer.name} (${topScorer.marks})` : 'N/A'}
            </div>
          </div>
        </div>

        {/* Average Attendance */}
        <div className="stat-card">
          <div className="stat-icon-wrapper success">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div className="stat-content">
            <h3>Avg Attendance</h3>
            <div className="stat-value">{averageAttendance}%</div>
          </div>
        </div>
      </div>

      {/* CSS-based Grade Distribution Histogram Panel */}
      <div className="glass-panel" style={{ marginBottom: '2.5rem', padding: '1.25rem 2rem' }}>
        <h3 className="distribution-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', marginBottom: '1rem' }}>
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}>
            <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
            <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
          </svg>
          Academic Grade Distribution Analysis
        </h3>
        {totalStudents > 0 ? (
          <>
            <div className="histogram-chart">
              {Object.entries(distribution).map(([grade, info]) => {
                const pct = maxCount > 0 ? (info.count / maxCount) * 80 : 0; // scale max height to 80%
                return (
                  <div key={grade} className="histogram-col" title={`${info.label}: ${info.count} students`}>
                    <span className="histogram-value">{info.count}</span>
                    <div 
                      className={`histogram-fill grade-${grade.toLowerCase()}`}
                      style={{ height: `${pct + 5}%` }} // Ensure minimum 5% for visual indicator
                    />
                    <span className="histogram-label">{grade}</span>
                  </div>
                );
              })}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center', margin: '0.5rem 0 0 0' }}>
              A: Excellent (85-100) &bull; B: Good (70-84) &bull; C: Average (50-69) &bull; D: Pass (40-49) &bull; F: Fail (&lt;40)
            </p>
          </>
        ) : (
          <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            No student records available to display grade analytics.
          </div>
        )}
      </div>
    </>
  );
};

export default StatsCards;
