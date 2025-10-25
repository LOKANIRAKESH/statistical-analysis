import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Scatter } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartVisualization = ({ results, distribution, parameters }) => {
  if (!results) return null;

  const generateNormalCurve = (mean, stdDev) => {
    const points = [];
    const start = mean - 4 * stdDev;
    const end = mean + 4 * stdDev;
    const step = (end - start) / 100;
    
    for (let x = start; x <= end; x += step) {
      const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * 
                Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
      points.push({ x: x.toFixed(2), y: y.toFixed(4) });
    }
    return points;
  };
  
  // NEW: Generate Binomial PMF data for a bar chart
  const generateBinomialPMF = (n, p) => {
    const data = [];
    const labels = [];
    for (let k = 0; k <= n; k++) {
      // Using the formula directly since jStat might not be in the frontend scope
      const pmf = (factorial(n) / (factorial(k) * factorial(n - k))) * Math.pow(p, k) * Math.pow(1 - p, n - k);
      data.push(pmf);
      labels.push(k.toString());
    }
    return { labels, data };
  };
  
  // NEW: Generate Poisson PMF data for a bar chart
  const generatePoissonPMF = (lambda) => {
    const data = [];
    const labels = [];
    // Generate a reasonable range, e.g., up to lambda * 3
    const maxK = Math.max(10, Math.ceil(lambda * 3));
    for (let k = 0; k <= maxK; k++) {
      const pmf = (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
      data.push(pmf);
      labels.push(k.toString());
    }
    return { labels, data };
  };
  
  // Helper function for factorial
  const factorial = (n) => {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const renderNormalChart = () => {
    // FIX: Use parameters passed from the parent component
    if (!parameters.mean || !parameters.stdDev) return null;
    
    const curveData = generateNormalCurve(parameters.mean, parameters.stdDev);
    
    const chartData = {
      labels: curveData.map(p => p.x),
      datasets: [
        {
          label: 'Normal Distribution',
          data: curveData.map(p => p.y),
          borderColor: 'rgb(102, 126, 234)',
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          fill: true,
          tension: 0.4
        }
      ]
    };

    const options = {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: {
          display: true,
          text: `Normal Distribution (μ=${parameters.mean}, σ=${parameters.stdDev})`
        }
      },
      scales: {
        x: { title: { display: true, text: 'X Value' } },
        y: { title: { display: true, text: 'Probability Density' } }
      }
    };

    return <Line data={chartData} options={options} />;
  };

  // NEW: Chart for Binomial Distribution
  const renderBinomialChart = () => {
    if (!parameters.n || !parameters.p) return null;
    const { labels, data } = generateBinomialPMF(parameters.n, parameters.p);

    const chartData = {
      labels,
      datasets: [{
        label: 'Probability Mass Function (PMF)',
        data,
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1
      }]
    };

    const options = {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: true, text: `Binomial Distribution (n=${parameters.n}, p=${parameters.p})` }
      },
      scales: {
        x: { title: { display: true, text: 'Number of Successes (k)' } },
        y: { title: { display: true, text: 'Probability P(X=k)' } }
      }
    };

    return <Bar data={chartData} options={options} />;
  };

  // NEW: Chart for Poisson Distribution
  const renderPoissonChart = () => {
    if (!parameters.lambda) return null;
    const { labels, data } = generatePoissonPMF(parameters.lambda);

    const chartData = {
      labels,
      datasets: [{
        label: 'Probability Mass Function (PMF)',
        data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };

    const options = {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: true, text: `Poisson Distribution (λ=${parameters.lambda})` }
      },
      scales: {
        x: { title: { display: true, text: 'Number of Events (k)' } },
        y: { title: { display: true, text: 'Probability P(X=k)' } }
      }
    };

    return <Bar data={chartData} options={options} />;
  };

  const renderHistogram = () => {
    if (!results.data) return null;
    
    const bins = 20;
    const min = Math.min(...results.data);
    const max = Math.max(...results.data);
    const binWidth = (max - min) / bins;
    
    const histogram = new Array(bins).fill(0);
    const binLabels = [];
    
    for (let i = 0; i < bins; i++) {
      const binStart = min + i * binWidth;
      const binEnd = binStart + binWidth;
      binLabels.push(`${binStart.toFixed(1)}-${binEnd.toFixed(1)}`);
    }
    
    results.data.forEach(value => {
      const binIndex = Math.min(Math.floor((value - min) / binWidth), bins - 1);
      histogram[binIndex]++;
    });
    
    const chartData = {
      labels: binLabels,
      datasets: [
        {
          label: 'Frequency',
          data: histogram,
          backgroundColor: 'rgba(102, 126, 234, 0.6)',
          borderColor: 'rgb(102, 126, 234)',
          borderWidth: 1
        }
      ]
    };

    const options = {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: true, text: 'Data Histogram' }
      },
      scales: {
        x: { title: { display: true, text: 'Bins' } },
        y: { title: { display: true, text: 'Frequency' } }
      }
    };

    return <Bar data={chartData} options={options} />;
  };

  const renderScatterPlot = () => {
    if (!results.data) return null;
    
    const chartData = {
      datasets: [
        {
          label: 'Data Points',
          data: results.data.map((value, index) => ({ x: index, y: value })),
          backgroundColor: 'rgba(102, 126, 234, 0.6)',
          borderColor: 'rgb(102, 126, 234)',
        }
      ]
    };

    const options = {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: true, text: 'Data Scatter Plot' }
      },
      scales: {
        x: { title: { display: true, text: 'Index' } },
        y: { title: { display: true, text: 'Value' } }
      }
    };

    return <Scatter data={chartData} options={options} />;
  };

  const renderRegressionChart = () => {
    // FIX: Use parameters passed from the parent component
    if (!parameters.x || !parameters.y) return null;
    
    const scatterData = parameters.x.map((x, i) => ({ x, y: parameters.y[i] }));
    
    const minX = Math.min(...parameters.x);
    const maxX = Math.max(...parameters.x);
    const lineData = [
      { x: minX, y: results.intercept + results.slope * minX },
      { x: maxX, y: results.intercept + results.slope * maxX }
    ];
    
    const chartData = {
      datasets: [
        {
          label: 'Data Points',
          data: scatterData,
          backgroundColor: 'rgba(102, 126, 234, 0.6)',
          borderColor: 'rgb(102, 126, 234)',
        },
        {
          label: 'Regression Line',
          data: lineData,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'transparent',
          borderWidth: 2,
          type: 'line',
          pointRadius: 0
        }
      ]
    };

    const options = {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: {
          display: true,
          text: `Linear Regression (R² = ${results.r2.toFixed(4)})`
        }
      },
      scales: {
        x: { title: { display: true, text: 'X' } },
        y: { title: { display: true, text: 'Y' } }
      }
    };

    return <Scatter data={chartData} options={options} />;
  };

  // UPDATED: Added cases for 'binomial' and 'poisson'
  const renderChart = () => {
    switch (distribution) {
      case 'normal':
        return (
          <>
            <div className="chart-container">{renderNormalChart()}</div>
            {results.data && (
              <>
                <div className="chart-container">{renderHistogram()}</div>
                <div className="chart-container">{renderScatterPlot()}</div>
              </>
            )}
          </>
        );
      case 'binomial':
        return <div className="chart-container">{renderBinomialChart()}</div>;
      case 'poisson':
        return <div className="chart-container">{renderPoissonChart()}</div>;
      case 'regression':
        return <div className="chart-container">{renderRegressionChart()}</div>;
      default:
        return null;
    }
  };

  return (
    <div className="chart-section">
      <h2>Visualization</h2>
      {renderChart()}
    </div>
  );
};

export default ChartVisualization;