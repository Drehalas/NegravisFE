/**
 * React Hooks for Negravis Frontend Integration
 * Connects with deployed frontend at negravis-frontend.vercel.app
 */

import { useState, useEffect, useCallback } from 'react';
import { negravisFrontendApiService } from '@/services/negravisFrontendApi';
import {
  OracleProvider,
  OraclePriceData,
  HederaTransaction,
  NetworkStatus,
  DashboardMetrics
} from '@/data/types';

// ==================== CONNECTION STATUS HOOK ====================

export function useNegravisFrontendConnection() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkConnection = useCallback(async () => {
    try {
      const connected = await negravisFrontendApiService.testConnection();
      setIsConnected(connected);
      setLastChecked(new Date());
      return connected;
    } catch (error) {
      setIsConnected(false);
      setLastChecked(new Date());
      return false;
    }
  }, []);

  useEffect(() => {
    checkConnection();
    
    // Check connection every 60 seconds
    const interval = setInterval(checkConnection, 60000);
    return () => clearInterval(interval);
  }, [checkConnection]);

  return {
    isConnected,
    lastChecked,
    checkConnection
  };
}

// ==================== ORACLE PROVIDERS HOOK ====================

export function useNegravisFrontendProviders() {
  const [providers, setProviders] = useState<OracleProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProviders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const providersData = await negravisFrontendApiService.getOracleProviders();
      setProviders(providersData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch providers');
      setProviders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProviders();
    
    // Refresh providers every 30 seconds
    const interval = setInterval(fetchProviders, 30000);
    return () => clearInterval(interval);
  }, [fetchProviders]);

  return {
    providers,
    loading,
    error,
    refresh: fetchProviders
  };
}

// ==================== ORACLE QUERY HOOK ====================

export function useNegravisFrontendQuery() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResponse, setLastResponse] = useState<any>(null);
  const [queryHistory, setQueryHistory] = useState<any[]>([]);

  const submitQuery = useCallback(async (
    provider: string,
    query: string,
    userId?: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await negravisFrontendApiService.submitOracleQuery(
        provider,
        query,
        userId
      );
      
      setLastResponse(response);
      
      // Add to history
      setQueryHistory(prev => [{
        id: Date.now(),
        provider,
        query,
        response,
        timestamp: new Date().toISOString()
      }, ...prev.slice(0, 9)]); // Keep last 10 queries
      
      return response;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Query failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearHistory = useCallback(() => {
    setQueryHistory([]);
    setLastResponse(null);
    setError(null);
  }, []);

  return {
    submitQuery,
    loading,
    error,
    lastResponse,
    queryHistory,
    clearHistory,
    clearError: () => setError(null)
  };
}

// ==================== PRICE DATA HOOK ====================

export function useNegravisFrontendPrice(symbol: string) {
  const [priceData, setPriceData] = useState<OraclePriceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrice = useCallback(async () => {
    if (!symbol) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await negravisFrontendApiService.getPriceData(symbol);
      setPriceData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch price');
      setPriceData(null);
    } finally {
      setLoading(false);
    }
  }, [symbol]);

  useEffect(() => {
    fetchPrice();
    
    // Refresh price every 10 seconds
    const interval = setInterval(fetchPrice, 10000);
    return () => clearInterval(interval);
  }, [fetchPrice]);

  return {
    priceData,
    loading,
    error,
    refresh: fetchPrice
  };
}

// ==================== MULTIPLE PRICES HOOK ====================

export function useNegravisFrontendPrices(symbols: string[]) {
  const [prices, setPrices] = useState<Record<string, OraclePriceData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = useCallback(async () => {
    if (symbols.length === 0) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const pricePromises = symbols.map(async (symbol) => {
        try {
          const price = await negravisFrontendApiService.getPriceData(symbol);
          return [symbol, price] as const;
        } catch (err) {
          console.warn(`Failed to fetch price for ${symbol}:`, err);
          return null;
        }
      });
      
      const results = await Promise.allSettled(pricePromises);
      const newPrices: Record<string, OraclePriceData> = {};
      
      results.forEach((result) => {
        if (result.status === 'fulfilled' && result.value) {
          const [symbol, price] = result.value;
          newPrices[symbol] = price;
        }
      });
      
      setPrices(newPrices);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prices');
    } finally {
      setLoading(false);
    }
  }, [symbols]);

  useEffect(() => {
    fetchPrices();
    
    // Refresh prices every 15 seconds
    const interval = setInterval(fetchPrices, 15000);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  return {
    prices,
    loading,
    error,
    refresh: fetchPrices
  };
}

// ==================== DASHBOARD METRICS HOOK ====================

export function useNegravisFrontendMetrics() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const metricsData = await negravisFrontendApiService.getDashboardMetrics();
      setMetrics(metricsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
      setMetrics(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
    
    // Refresh metrics every 20 seconds
    const interval = setInterval(fetchMetrics, 20000);
    return () => clearInterval(interval);
  }, [fetchMetrics]);

  return {
    metrics,
    loading,
    error,
    refresh: fetchMetrics
  };
}

// ==================== NETWORK STATUS HOOK ====================

export function useNegravisFrontendNetworkStatus() {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNetworkStatus = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const statusData = await negravisFrontendApiService.getNetworkStatus();
      setNetworkStatus(statusData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch network status');
      setNetworkStatus(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNetworkStatus();
    
    // Refresh network status every 10 seconds
    const interval = setInterval(fetchNetworkStatus, 10000);
    return () => clearInterval(interval);
  }, [fetchNetworkStatus]);

  return {
    networkStatus,
    loading,
    error,
    refresh: fetchNetworkStatus
  };
}

// ==================== TRANSACTION HISTORY HOOK ====================

export function useNegravisFrontendTransactions(limit: number = 10) {
  const [transactions, setTransactions] = useState<HederaTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const transactionsData = await negravisFrontendApiService.getTransactionHistory(limit);
      setTransactions(transactionsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchTransactions();
    
    // Refresh transactions every 60 seconds
    const interval = setInterval(fetchTransactions, 60000);
    return () => clearInterval(interval);
  }, [fetchTransactions]);

  return {
    transactions,
    loading,
    error,
    refresh: fetchTransactions
  };
}

// ==================== COMBINED DASHBOARD HOOK ====================

export function useNegravisFrontendDashboard() {
  const { isConnected } = useNegravisFrontendConnection();
  const { providers, loading: providersLoading, error: providersError } = useNegravisFrontendProviders();
  const { metrics, loading: metricsLoading, error: metricsError } = useNegravisFrontendMetrics();
  const { networkStatus, loading: networkLoading, error: networkError } = useNegravisFrontendNetworkStatus();
  const { transactions, loading: transactionsLoading, error: transactionsError } = useNegravisFrontendTransactions(5);

  const loading = providersLoading || metricsLoading || networkLoading || transactionsLoading;
  const error = providersError || metricsError || networkError || transactionsError;

  return {
    isConnected,
    providers,
    metrics,
    networkStatus,
    transactions,
    loading,
    error,
    stats: {
      totalProviders: providers.length,
      activeProviders: providers.filter(p => p.isActive).length,
      avgResponseTime: providers.reduce((sum, p) => sum + p.responseTime, 0) / providers.length || 0,
      avgReliability: providers.reduce((sum, p) => sum + p.reliability, 0) / providers.length || 0
    }
  };
}

// ==================== CACHE MANAGEMENT HOOK ====================

export function useNegravisFrontendCache() {
  const [stats, setStats] = useState<{ size: number; keys: string[] }>({ size: 0, keys: [] });

  const updateStats = useCallback(() => {
    setStats(negravisFrontendApiService.getCacheStats());
  }, []);

  const clearCache = useCallback((key?: string) => {
    negravisFrontendApiService.clearCache(key);
    updateStats();
  }, [updateStats]);

  useEffect(() => {
    updateStats();
    const interval = setInterval(updateStats, 5000);
    return () => clearInterval(interval);
  }, [updateStats]);

  return {
    stats,
    clearCache,
    refresh: updateStats
  };
}