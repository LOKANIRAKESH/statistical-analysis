import React, { useState } from 'react';

const ParameterInput = ({ distribution, onCalculate }) => {
  const [params, setParams] = useState({});

  const handleInputChange = (field, value) => {
    setParams(prev => ({ ...prev, [field]: parseFloat(value) || value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(params);
  };

  const renderNormalInputs = () => (
    <>
      <div className="input-group">
        <label>Mean (μ)</label>
        <input
          type="number"
          step="0.1"
          value={params.mean || ''}
          onChange={(e) => handleInputChange('mean', e.target.value)}
          placeholder="0"
        />
      </div>
      <div className="input-group">
        <label>Standard Deviation (σ)</label>
        <input
          type="number"
          step="0.1"
          min="0.1"
          value={params.stdDev || ''}
          onChange={(e) => handleInputChange('stdDev', e.target.value)}
          placeholder="1"
        />
      </div>
      <div className="input-group">
        <label>X Value (for point probability)</label>
        <input
          type="number"
          step="0.1"
          value={params.x || ''}
          onChange={(e) => handleInputChange('x', e.target.value)}
          placeholder="0"
        />
      </div>
      <div className="input-group">
        <label>Lower Bound (for range)</label>
        <input
          type="number"
          step="0.1"
          value={params.lower || ''}
          onChange={(e) => handleInputChange('lower', e.target.value)}
          placeholder="-1"
        />
      </div>
      <div className="input-group">
        <label>Upper Bound (for range)</label>
        <input
          type="number"
          step="0.1"
          value={params.upper || ''}
          onChange={(e) => handleInputChange('upper', e.target.value)}
          placeholder="1"
        />
      </div>
      <div className="input-group">
        <label>
          <input
            type="checkbox"
            checked={params.generateData || false}
            onChange={(e) => handleInputChange('generateData', e.target.checked)}
          />
          Generate Sample Data
        </label>
      </div>
      {params.generateData && (
        <div className="input-group">
          <label>Sample Size</label>
          <input
            type="number"
            min="10"
            max="1000"
            value={params.dataSize || 100}
            onChange={(e) => handleInputChange('dataSize', e.target.value)}
          />
        </div>
      )}
    </>
  );

  const renderBinomialInputs = () => (
    <>
      <div className="input-group">
        <label>Number of Trials (n)</label>
        <input
          type="number"
          min="1"
          value={params.n || ''}
          onChange={(e) => handleInputChange('n', e.target.value)}
          placeholder="10"
        />
      </div>
      <div className="input-group">
        <label>Probability of Success (p)</label>
        <input
          type="number"
          step="0.01"
          min="0"
          max="1"
          value={params.p || ''}
          onChange={(e) => handleInputChange('p', e.target.value)}
          placeholder="0.5"
        />
      </div>
      <div className="input-group">
        <label>Number of Successes (k)</label>
        <input
          type="number"
          min="0"
          value={params.k || ''}
          onChange={(e) => handleInputChange('k', e.target.value)}
          placeholder="5"
        />
      </div>
    </>
  );

  const renderPoissonInputs = () => (
    <>
      <div className="input-group">
        <label>Rate (λ)</label>
        <input
          type="number"
          step="0.1"
          min="0.1"
          value={params.lambda || ''}
          onChange={(e) => handleInputChange('lambda', e.target.value)}
          placeholder="2"
        />
      </div>
      <div className="input-group">
        <label>Number of Events (k)</label>
        <input
          type="number"
          min="0"
          value={params.k || ''}
          onChange={(e) => handleInputChange('k', e.target.value)}
          placeholder="3"
        />
      </div>
    </>
  );

  const renderDescriptiveInputs = () => (
    <div className="input-group">
      <label>Enter Data (comma-separated)</label>
      <textarea
        style={{ width: '100%', padding: '10px', minHeight: '100px', borderRadius: '8px', border: '2px solid #e0e0e0' }}
        value={params.dataText || ''}
        onChange={(e) => {
          const text = e.target.value;
          setParams(prev => ({ ...prev, dataText: text }));
          const data = text.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
          if (data.length > 0) {
            setParams(prev => ({ ...prev, data }));
          }
        }}
        placeholder="1, 2, 3, 4, 5, 6, 7, 8, 9, 10"
      />
    </div>
  );

  const renderHypothesisInputs = () => (
    <>
      <div className="input-group">
        <label>Sample Mean</label>
        <input
          type="number"
          step="0.1"
          value={params.sampleMean || ''}
          onChange={(e) => handleInputChange('sampleMean', e.target.value)}
          placeholder="105"
        />
      </div>
      <div className="input-group">
        <label>Population Mean</label>
        <input
          type="number"
          step="0.1"
          value={params.populationMean || ''}
          onChange={(e) => handleInputChange('populationMean', e.target.value)}
          placeholder="100"
        />
      </div>
      <div className="input-group">
        <label>Standard Deviation</label>
        <input
          type="number"
          step="0.1"
          min="0.1"
          value={params.stdDev || ''}
          onChange={(e) => handleInputChange('stdDev', e.target.value)}
          placeholder="15"
        />
      </div>
      <div className="input-group">
        <label>Sample Size (n)</label>
        <input
          type="number"
          min="2"
          value={params.n || ''}
          onChange={(e) => handleInputChange('n', e.target.value)}
          placeholder="30"
        />
      </div>
      <div className="input-group">
        <label>Alternative Hypothesis</label>
        <select
          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #e0e0e0' }}
          value={params.alternative || 'two-tailed'}
          onChange={(e) => handleInputChange('alternative', e.target.value)}
        >
          <option value="two-tailed">Two-tailed (≠)</option>
          <option value="greater">Greater than ({'>'})</option>
          <option value="less">Less than (&lt;)</option>
        </select>
      </div>
    </>
  );

  const renderRegressionInputs = () => (
    <div className="input-group">
      <label>Enter X Values (comma-separated)</label>
      <textarea
        style={{ width: '100%', padding: '10px', minHeight: '80px', borderRadius: '8px', border: '2px solid #e0e0e0', marginBottom: '10px' }}
        value={params.xText || ''}
        onChange={(e) => {
          const text = e.target.value;
          setParams(prev => ({ ...prev, xText: text }));
          const x = text.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
          if (x.length > 0) {
            setParams(prev => ({ ...prev, x }));
          }
        }}
        placeholder="1, 2, 3, 4, 5, 6, 7, 8, 9, 10"
      />
      <label>Enter Y Values (comma-separated)</label>
      <textarea
        style={{ width: '100%', padding: '10px', minHeight: '80px', borderRadius: '8px', border: '2px solid #e0e0e0' }}
        value={params.yText || ''}
        onChange={(e) => {
          const text = e.target.value;
          setParams(prev => ({ ...prev, yText: text }));
          const y = text.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
          if (y.length > 0) {
            setParams(prev => ({ ...prev, y }));
          }
        }}
        placeholder="2, 4, 5, 4, 5, 7, 8, 9, 10, 12"
      />
    </div>
  );

  const renderInputs = () => {
    switch (distribution) {
      case 'normal':
        return renderNormalInputs();
      case 'binomial':
        return renderBinomialInputs();
      case 'poisson':
        return renderPoissonInputs();
      case 'descriptive':
        return renderDescriptiveInputs();
      case 'hypothesis':
        return renderHypothesisInputs();
      case 'regression':
        return renderRegressionInputs();
      default:
        return null;
    }
  };

  return (
    <div className="parameter-input">
      <h3>Parameters</h3>
      <form onSubmit={handleSubmit}>
        {renderInputs()}
        <button type="submit" className="calculate-button">
          Calculate
        </button>
      </form>
    </div>
  );
};

export default ParameterInput;      