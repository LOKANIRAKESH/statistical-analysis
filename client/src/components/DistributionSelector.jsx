import React from 'react';

const DistributionSelector = ({ selectedDistribution, onSelect }) => {
  const distributions = [
    { id: 'normal', name: 'Normal Distribution', icon: '📊' },
    { id: 'binomial', name: 'Binomial Distribution', icon: '🎲' },
    { id: 'poisson', name: 'Poisson Distribution', icon: '📈' },
    { id: 'descriptive', name: 'Descriptive Statistics', icon: '📋' },
    { id: 'hypothesis', name: 'Hypothesis Testing', icon: '🔬' },
    { id: 'regression', name: 'Linear Regression', icon: '📉' }
  ];

  return (
    <div className="distribution-selector">
      <h2>Select Analysis Type</h2>
      <div className="distribution-tabs">
        {distributions.map(dist => (
          <button
            key={dist.id}
            className={`tab-button ${selectedDistribution === dist.id ? 'active' : ''}`}
            onClick={() => onSelect(dist.id)}
          >
            <span style={{ marginRight: '10px' }}>{dist.icon}</span>
            {dist.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DistributionSelector;