const jStat = require('jstat');

class StatisticalFunctions {
  // Normal Distribution
  static normalDistribution(mean, stdDev, x) {
    const pdf = jStat.normal.pdf(x, mean, stdDev);
    const cdf = jStat.normal.cdf(x, mean, stdDev);
    return { pdf, cdf };
  }

  static normalRangeProbability(mean, stdDev, lower, upper) {
    const lowerCdf = jStat.normal.cdf(lower, mean, stdDev);
    const upperCdf = jStat.normal.cdf(upper, mean, stdDev);
    return upperCdf - lowerCdf;
  }

  static generateNormalData(mean, stdDev, size) {
    const data = [];
    for (let i = 0; i < size; i++) {
      data.push(jStat.normal.sample(mean, stdDev));
    }
    return data;
  }

  // Binomial Distribution
  static binomialDistribution(n, p, k) {
    const pmf = jStat.binomial.pdf(k, n, p);
    const cdf = jStat.binomial.cdf(k, n, p);
    return { pmf, cdf };
  }

  // Poisson Distribution
  static poissonDistribution(lambda, k) {
    const pmf = jStat.poisson.pdf(k, lambda);
    const cdf = jStat.poisson.cdf(k, lambda);
    return { pmf, cdf };
  }

  // Exponential Distribution
  static exponentialDistribution(lambda, x) {
    const pdf = jStat.exponential.pdf(x, lambda);
    const cdf = jStat.exponential.cdf(x, lambda);
    return { pdf, cdf };
  }

  // Uniform Distribution
  static uniformDistribution(a, b, x) {
    const pdf = jStat.uniform.pdf(x, a, b);
    const cdf = jStat.uniform.cdf(x, a, b);
    return { pdf, cdf };
  }

  // Descriptive Statistics
  static descriptiveStats(data) {
    return {
      mean: jStat.mean(data),
      median: jStat.median(data),
      mode: jStat.mode(data),
      variance: jStat.variance(data),
      stdDev: jStat.stdev(data),
      min: jStat.min(data),
      max: jStat.max(data),
      range: jStat.range(data),
      skewness: jStat.skewness(data),
      kurtosis: jStat.kurtosis(data)
    };
  }

  // Hypothesis Testing
  static zTest(sampleMean, populationMean, stdDev, n, alternative = 'two-tailed') {
    const zScore = (sampleMean - populationMean) / (stdDev / Math.sqrt(n));
    let pValue;
    
    if (alternative === 'two-tailed') {
      pValue = 2 * (1 - jStat.normal.cdf(Math.abs(zScore), 0, 1));
    } else if (alternative === 'greater') {
      pValue = 1 - jStat.normal.cdf(zScore, 0, 1);
    } else {
      pValue = jStat.normal.cdf(zScore, 0, 1);
    }
    
    return { zScore, pValue };
  }

  static tTest(sample1, sample2, alternative = 'two-tailed') {
    const result = jStat.ttest(sample1, sample2);
    return {
      tStatistic: result,
      pValue: alternative === 'two-tailed' ? result * 2 : result
    };
  }

  // Correlation
  static pearsonCorrelation(x, y) {
    return jStat.corrcoeff(x, y);
  }

  // Linear Regression
  static linearRegression(x, y) {
    const regression = jStat.linearRegression(x, y);
    const r2 = jStat.corrcoeff(x, y) ** 2;
    return {
      slope: regression.slope,
      intercept: regression.intercept,
      r2,
      equation: `y = ${regression.slope.toFixed(4)}x + ${regression.intercept.toFixed(4)}`
    };
  }
}

module.exports = StatisticalFunctions;  