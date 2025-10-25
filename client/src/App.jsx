import React, { useState, useEffect } from 'react';
import DistributionSelector from './components/DistributionSelector';
import ParameterInput from './components/ParameterInput';
import ResultDisplay from './components/ResultDisplay';
import ChartVisualization from './components/ChartVisualization';
import StatisticsTable from './components/StatisticsTable';
import { useStatistics } from './hooks/useStatistics';

function App() {
  const [selectedDistribution, setSelectedDistribution] = useState('normal');
  // NEW: State to hold the parameters of the last calculation
  const [lastParameters, setLastParameters] = useState({}); 
  
  const {
    loading,
    error,
    results,
    history,
    calculateNormal,
    calculateBinomial,
    calculatePoisson,
    calculateDescriptive,
    performZTest,
    performRegression,
    fetchHistory,
    clearError
  } = useStatistics();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleCalculate = async (params) => {
    clearError();
    // NEW: Store the parameters before calculating
    setLastParameters(params); 
    try {
      switch (selectedDistribution) {
        case 'normal':
          await calculateNormal(params);
          break;
        case 'binomial':
          await calculateBinomial(params);
          break;
        case 'poisson':
          await calculatePoisson(params);
          break;
        case 'descriptive':
          await calculateDescriptive(params);
          break;
        case 'hypothesis':
          await performZTest(params);
          break;
        case 'regression':
          await performRegression(params);
          break;
        default:
          break;
      }
      fetchHistory();
    } catch (err) {
      console.error('Calculation error:', err);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Statistical Analysis & Probability Tools</h1>
        <p className="subtitle">Advanced statistical computations and visualizations</p>
      </header>

      <div className="main-content">
        <aside className="sidebar">
          <DistributionSelector
            selectedDistribution={selectedDistribution}
            onSelect={setSelectedDistribution}
          />
          <ParameterInput
            distribution={selectedDistribution}
            onCalculate={handleCalculate}
          />
        </aside>

        <main className="content-area">
          {error && (
            <div className="error-message">
              Error: {error}
            </div>
          )}

          {loading && (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          )}

          {!loading && !error && results && (
            <>
              <ResultDisplay
                results={results}
                distribution={selectedDistribution}
              />
              {/* UPDATED: Pass the lastParameters to the visualization component */}
              <ChartVisualization
                results={results}
                distribution={selectedDistribution}
                parameters={lastParameters}
              />
            </>
          )}

          {!loading && !error && !results && (
            <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
              <h2>Welcome to Statistical Analysis Tools</h2>
              <p style={{ marginTop: '20px', fontSize: '1.1rem' }}>
                Select an analysis type from the sidebar and enter parameters to get started.
              </p>
            </div>
          )}
        </main>
      </div>

      <StatisticsTable history={history} fetchHistory={fetchHistory} />
    </div>
  );
}

export default App;