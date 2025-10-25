import React from 'react';

const StatisticsTable = ({ history }) => {
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
      <h2>Calculation History</h2>
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