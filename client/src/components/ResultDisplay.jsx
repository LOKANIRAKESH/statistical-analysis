import React from 'react';

const ResultDisplay = ({ results, distribution }) => {
  if (!results) return null;

  const formatNumber = (num, decimals = 4) => {
    return typeof num === 'number' ? num.toFixed(decimals) : num;
  };

  const renderNormalResults = () => (
    <>
      {results.point && (
        <div className="result-card">
          <h3>Point Probability</h3>
          <div className="result-value">
            PDF: {formatNumber(results.point.pdf)}
          </div>
          <div className="result-value">
            CDF: {formatNumber(results.point.cdf)}
          </div>
          <p className="result-description">
            PDF: Probability density at X<br/>
            CDF: Cumulative probability up to X
          </p>
        </div>
      )}
      {results.range && (
        <div className="result-card">
          <h3>Range Probability</h3>
          <div className="result-value">
            P({results.lower} ≤ X ≤ {results.upper}) = {formatNumber(results.range)}
          </div>
          <p className="result-description">
            Probability that X falls within the specified range
          </p>
        </div>
      )}
      {results.statistics && (
        <div className="result-card">
          <h3>Sample Statistics</h3>
          <table className="statistics-table">
            <tbody>
              <tr>
                <td>Mean</td>
                <td>{formatNumber(results.statistics.mean)}</td>
              </tr>
              <tr>
                <td>Median</td>
                <td>{formatNumber(results.statistics.median)}</td>
              </tr>
              <tr>
                <td>Standard Deviation</td>
                <td>{formatNumber(results.statistics.stdDev)}</td>
              </tr>
              <tr>
                <td>Variance</td>
                <td>{formatNumber(results.statistics.variance)}</td>
              </tr>
              <tr>
                <td>Min</td>
                <td>{formatNumber(results.statistics.min)}</td>
              </tr>
              <tr>
                <td>Max</td>
                <td>{formatNumber(results.statistics.max)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );

  const renderBinomialResults = () => (
    <div className="result-card">
      <h3>Binomial Distribution Results</h3>
      <div className="result-value">
        PMF: {formatNumber(results.pmf)}
      </div>
      <div className="result-value">
        CDF: {formatNumber(results.cdf)}
      </div>
      <p className="result-description">
        PMF: Probability of exactly k successes<br/>
        CDF: Probability of k or fewer successes
      </p>
    </div>
  );

  const renderPoissonResults = () => (
    <div className="result-card">
      <h3>Poisson Distribution Results</h3>
      <div className="result-value">
        PMF: {formatNumber(results.pmf)}
      </div>
      <div className="result-value">
        CDF: {formatNumber(results.cdf)}
      </div>
      <p className="result-description">
        PMF: Probability of exactly k events<br/>
        CDF: Probability of k or fewer events
      </p>
    </div>
  );

  const renderDescriptiveResults = () => (
    <div className="result-card">
      <h3>Descriptive Statistics</h3>
      <table className="statistics-table">
        <tbody>
          <tr>
            <td>Mean</td>
            <td>{formatNumber(results.mean)}</td>
          </tr>
          <tr>
            <td>Median</td>
            <td>{formatNumber(results.median)}</td>
          </tr>
          <tr>
            <td>Mode</td>
            <td>{Array.isArray(results.mode) ? results.mode.join(', ') : formatNumber(results.mode)}</td>
          </tr>
          <tr>
            <td>Standard Deviation</td>
            <td>{formatNumber(results.stdDev)}</td>
          </tr>
          <tr>
            <td>Variance</td>
            <td>{formatNumber(results.variance)}</td>
          </tr>
          <tr>
            <td>Range</td>
            <td>{formatNumber(results.range)}</td>
          </tr>
          <tr>
            <td>Skewness</td>
            <td>{formatNumber(results.skewness)}</td>
          </tr>
          <tr>
            <td>Kurtosis</td>
            <td>{formatNumber(results.kurtosis)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderHypothesisResults = () => (
    <div className="result-card">
      <h3>Z-Test Results</h3>
      <div className="result-value">
        Z-Score: {formatNumber(results.zScore)}
      </div>
      <div className="result-value">
        P-Value: {formatNumber(results.pValue)}
      </div>
      <p className="result-description">
        {results.pValue < 0.05 
          ? "Result is statistically significant (p < 0.05)"
          : "Result is not statistically significant (p ≥ 0.05)"
        }
      </p>
    </div>
  );

  const renderRegressionResults = () => (
    <div className="result-card">
      <h3>Linear Regression Results</h3>
      <div className="result-value">
        {results.equation}
      </div>
      <table className="statistics-table">
        <tbody>
          <tr>
            <td>Slope</td>
            <td>{formatNumber(results.slope)}</td>
          </tr>
          <tr>
            <td>Intercept</td>
            <td>{formatNumber(results.intercept)}</td>
          </tr>
          <tr>
            <td>R²</td>
            <td>{formatNumber(results.r2)}</td>
          </tr>
        </tbody>
      </table>
      <p className="result-description">
        R² value indicates the proportion of variance explained by the model
      </p>
    </div>
  );

  const renderResults = () => {
    switch (distribution) {
      case 'normal':
        return renderNormalResults();
      case 'binomial':
        return renderBinomialResults();
      case 'poisson':
        return renderPoissonResults();
      case 'descriptive':
        return renderDescriptiveResults();
      case 'hypothesis':
        return renderHypothesisResults();
      case 'regression':
        return renderRegressionResults();
      default:
        return null;
    }
  };

  return (
    <div className="results-section">
      <h2>Results</h2>
      {renderResults()}
    </div>
  );
};

export default ResultDisplay;           