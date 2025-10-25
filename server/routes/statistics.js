const express = require('express');
const router = express.Router();
const StatisticalFunctions = require('../utils/statisticalFunctions');
const Calculation = require('../models/Calculation');

// Normal Distribution
router.post('/normal', async (req, res) => {
  try {
    const { mean, stdDev, x, lower, upper, generateData, dataSize } = req.body;
    
    let results = {};
    
    if (x !== undefined) {
      results.point = StatisticalFunctions.normalDistribution(mean, stdDev, x);
    }
    
    if (lower !== undefined && upper !== undefined) {
      results.range = StatisticalFunctions.normalRangeProbability(mean, stdDev, lower, upper);
    }
    
    if (generateData) {
      results.data = StatisticalFunctions.generateNormalData(mean, stdDev, dataSize || 100);
      results.statistics = StatisticalFunctions.descriptiveStats(results.data);
    }
    
    // Save to database
    const calculation = new Calculation({
      distribution: 'normal',
      parameters: { mean, stdDev, x, lower, upper },
      results
    });
    await calculation.save();
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Binomial Distribution
router.post('/binomial', async (req, res) => {
  try {
    const { n, p, k } = req.body;
    const results = StatisticalFunctions.binomialDistribution(n, p, k);
    
    const calculation = new Calculation({
      distribution: 'binomial',
      parameters: { n, p, k },
      results
    });
    await calculation.save();
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Poisson Distribution
router.post('/poisson', async (req, res) => {
  try {
    const { lambda, k } = req.body;
    const results = StatisticalFunctions.poissonDistribution(lambda, k);
    
    const calculation = new Calculation({
      distribution: 'poisson',
      parameters: { lambda, k },
      results
    });
    await calculation.save();
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Descriptive Statistics
router.post('/descriptive', async (req, res) => {
  try {
    const { data } = req.body;
    const results = StatisticalFunctions.descriptiveStats(data);
    
    const calculation = new Calculation({
      distribution: 'descriptive',
      parameters: { dataSize: data.length },
      results
    });
    await calculation.save();
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hypothesis Testing
router.post('/hypothesis/z-test', async (req, res) => {
  try {
    const { sampleMean, populationMean, stdDev, n, alternative } = req.body;
    const results = StatisticalFunctions.zTest(sampleMean, populationMean, stdDev, n, alternative);
    
    const calculation = new Calculation({
      distribution: 'z-test',
      parameters: { sampleMean, populationMean, stdDev, n, alternative },
      results
    });
    await calculation.save();
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Linear Regression
router.post('/regression', async (req, res) => {
  try {
    const { x, y } = req.body;
    const results = StatisticalFunctions.linearRegression(x, y);
    
    const calculation = new Calculation({
      distribution: 'regression',
      parameters: { dataSize: x.length },
      results
    });
    await calculation.save();
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get calculation history
router.get('/history', async (req, res) => {
  try {
    const calculations = await Calculation.find().sort({ createdAt: -1 }).limit(50);
    res.json(calculations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;        