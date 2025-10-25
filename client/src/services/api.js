import axios from 'axios';

const API_BASE_URL = '/api/statistics';

export const statisticalAPI = {
  // Normal Distribution
  calculateNormal: (params) => axios.post(`${API_BASE_URL}/normal`, params),
  
  // Binomial Distribution
  calculateBinomial: (params) => axios.post(`${API_BASE_URL}/binomial`, params),
  
  // Poisson Distribution
  calculatePoisson: (params) => axios.post(`${API_BASE_URL}/poisson`, params),
  
  // Descriptive Statistics
  calculateDescriptive: (data) => axios.post(`${API_BASE_URL}/descriptive`, { data }),
  
  // Hypothesis Testing
  performZTest: (params) => axios.post(`${API_BASE_URL}/hypothesis/z-test`, params),
  
  // Linear Regression
  performRegression: (params) => axios.post(`${API_BASE_URL}/regression`, params),
  
  // Get History
  getHistory: () => axios.get(`${API_BASE_URL}/history`)
};      