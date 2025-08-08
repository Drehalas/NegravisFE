/**
 * React Hooks for 0G Compute Network Integration
 * Dynamic data fetching to replace static mocks
 */

import { useState, useEffect, useCallback } from 'react';
import { zeroGApiService } from '@/services/zeroGApi';
import {
  OracleProvider,
  HederaTransaction,
  NetworkStatus,
  DashboardMetrics,
  HederaAccount
} from '@/data/types';

// ==================== ACCOUNT HOOKS ====================

export function useZeroGAccount() {
  const [account, setAccount] = useState<HederaAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAccount = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const accountData = await zeroGApiService.getAccountInfo();
      setAccount(accountData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch account');
      setAccount(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const depositFunds = useCallback(async (amount: number) => {
    try {
      setError(null);
      const result = await zeroGApiService.depositFunds(amount);
      if (result.success) {
        await fetchAccount(); // Refresh account data
      }
      return result;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Deposit failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, [fetchAccount]);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  return {
    account,
    loading,
    error,
    refresh: fetchAccount,
    depositFunds
  };
}

// ==================== SERVICE PROVIDER HOOKS ====================

export function useZeroGProviders() {
  const [providers, setProviders] = useState<OracleProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProviders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const providersData = await zeroGApiService.getServiceProviders();
      setProviders(providersData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch providers');
      setProviders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const acknowledgeProvider = useCallback(async (providerAddress: string) => {
    try {
      setError(null);
      const result = await zeroGApiService.acknowledgeProvider(providerAddress);
      if (result.success) {
        await fetchProviders(); // Refresh providers data
      }
      return result;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Acknowledgment failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, [fetchProviders]);

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
    refresh: fetchProviders,
    acknowledgeProvider
  };
}

// ==================== AI QUERY HOOKS ====================

export function useZeroGQuery() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResponse, setLastResponse] = useState<any>(null);

  const submitQuery = useCallback(async (
    providerAddress: string, 
    query: string, 
    fallbackFee: number = 0.01
  ) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await zeroGApiService.submitQuery({
        providerAddress,
        query,
        fallbackFee
      });
      
      setLastResponse(response);
      return response;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Query failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    submitQuery,
    loading,
    error,
    lastResponse,
    clearError: () => setError(null)
  };
}

// ==================== TRANSACTION HISTORY HOOKS ====================

export function useZeroGTransactions(limit: number = 10) {
  const [transactions, setTransactions] = useState<HederaTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const transactionsData = await zeroGApiService.getTransactionHistory(limit);
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

// ==================== NETWORK STATUS HOOKS ====================

export function useZeroGNetworkStatus() {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNetworkStatus = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const statusData = await zeroGApiService.getNetworkStatus();
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

// ==================== DASHBOARD METRICS HOOKS ====================

export function useZeroGDashboardMetrics() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const metricsData = await zeroGApiService.getDashboardMetrics();
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
    
    // Refresh metrics every 15 seconds
    const interval = setInterval(fetchMetrics, 15000);
    return () => clearInterval(interval);
  }, [fetchMetrics]);

  return {
    metrics,
    loading,
    error,
    refresh: fetchMetrics
  };
}

// ==================== COMBINED DATA HOOK ====================

export function useZeroGDashboard() {
  const { account, loading: accountLoading, error: accountError } = useZeroGAccount();
  const { providers, loading: providersLoading, error: providersError } = useZeroGProviders();
  const { transactions, loading: transactionsLoading, error: transactionsError } = useZeroGTransactions(5);
  const { networkStatus, loading: networkLoading, error: networkError } = useZeroGNetworkStatus();
  const { metrics, loading: metricsLoading, error: metricsError } = useZeroGDashboardMetrics();

  const loading = accountLoading || providersLoading || transactionsLoading || networkLoading || metricsLoading;
  const error = accountError || providersError || transactionsError || networkError || metricsError;

  return {
    account,
    providers,
    transactions,
    networkStatus,
    metrics,
    loading,
    error,
    isConnected: !!account && networkStatus?.status === 'online'
  };
}