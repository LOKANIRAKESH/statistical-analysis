import React from 'react';

const StatisticsTable = ({ history, fetchHistory }) => { // Add fetchHistory to props
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getDistributionIcon = (distribution) => {
    const icons = {
      normal: '📊',
      binomial: '🎲',
      poisson: '📈',
      descriptive: '📋',
      'z-test': '🔬',
      regression: '📉'
    };
    return icons[distribution] || '📊';
  };

  return (
    <div className="history-section">
      {/* Add a header with the refresh button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Calculation History</h2>
        <button onClick={fetchHistory} className="calculate-button" style={{ padding: '10px 15px', fontSize: '0.9rem' }}>
          Refresh History
        </button>
      </div>

      {history.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
          No calculations yet. Start by selecting an analysis type.
        </p>
      ) : (
        <div>
          {history.map((item, index) => (
            <div key={index} className="history-item">
              <div>
                <span style={{ marginRight: '10px' }}>
                  {getDistributionIcon(item.distribution)}
                </span>
                <span style={{ fontWeight: '600' }}>
                  {item.distribution.charAt(0).toUpperCase() + item.distribution.slice(1)}
                </span>
                <div className="history-date">
                  {formatDate(item.createdAt)}
                </div>
              </div>
              <div className="history-type">
                View Details
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatisticsTable;