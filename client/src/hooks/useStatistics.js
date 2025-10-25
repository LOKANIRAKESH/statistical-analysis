import { useState, useCallback } from 'react';
import { statisticalAPI } from '../services/api';

export const useStatistics = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState([]);

  const calculateNormal = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const response = await statisticalAPI.calculateNormal(params);
      setResults(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const calculateBinomial = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const response = await statisticalAPI.calculateBinomial(params);
      setResults(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const calculatePoisson = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const response = await statisticalAPI.calculatePoisson(params);
      setResults(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const calculateDescriptive = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await statisticalAPI.calculateDescriptive(data);
      setResults(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const performZTest = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const response = await statisticalAPI.performZTest(params);
      setResults(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const performRegression = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const response = await statisticalAPI.performRegression(params);
      setResults(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchHistory = useCallback(async () => {
    try {
      const response = await statisticalAPI.getHistory();
      setHistory(response.data);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  }, []);

  return {
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
    clearResults: () => setResults(null),
    clearError: () => setError(null)
  };
};
