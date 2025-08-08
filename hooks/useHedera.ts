/**
 * React hooks for Hedera Hashgraph integration
 */

import { useState, useEffect } from 'react';
import { 
  hederaApiService, 
  HederaAccount, 
  HederaTransaction, 
  OracleProvider, 
  OraclePriceData 
} from '@/services/hederaApi';

/**
 * Hook for managing Hedera wallet connection
 */
export function useHederaWallet() {
  const [account, setAccount] = useState<HederaAccount | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      
      const result = await hederaApiService.connectWallet();
      
      if (result.success && result.accountId) {
        const accountData = await hederaApiService.getAccount(result.accountId);
        setAccount(accountData);
      } else {
        setError(result.error || 'Failed to connect wallet');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setError(null);
  };

  const refreshAccount = async () => {
    if (account?.accountId) {
      try {
        const accountData = await hederaApiService.getAccount(account.accountId);
        setAccount(accountData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to refresh account');
      }
    }
  };

  return {
    account,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    refreshAccount,
    isConnected: !!account
  };
}

/**
 * Hook for account balance and transactions
 */
export function useHederaAccount(accountId?: string) {
  const [balance, setBalance] = useState<{ balance: number; currency: string } | null>(null);
  const [transactions, setTransactions] = useState<HederaTransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!accountId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const [balanceData, transactionData] = await Promise.all([
        hederaApiService.getAccountBalance(accountId),
        hederaApiService.getTransactionHistory(accountId, 20)
      ]);
      
      setBalance(balanceData);
      setTransactions(transactionData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch account data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [accountId]);

  return {
    balance,
    transactions,
    loading,
    error,
    refetch: fetchData
  };
}

/**
 * Hook for Oracle providers
 */
export function useOracleProviders() {
  const [providers, setProviders] = useState<OracleProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      setError(null);
      const providerData = await hederaApiService.getOracleProviders();
      setProviders(providerData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch providers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
    // Refresh providers every 30 seconds
    const interval = setInterval(fetchProviders, 30000);
    return () => clearInterval(interval);
  }, []);

  return {
    providers,
    loading,
    error,
    refetch: fetchProviders
  };
}

/**
 * Hook for Oracle price data
 */
export function useOraclePrice(symbol: string) {
  const [priceData, setPriceData] = useState<OraclePriceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrice = async () => {
    if (!symbol) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await hederaApiService.getOraclePriceData(symbol);
      setPriceData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch price data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice();
    // Refresh price every 10 seconds
    const interval = setInterval(fetchPrice, 10000);
    return () => clearInterval(interval);
  }, [symbol]);

  return {
    priceData,
    loading,
    error,
    refetch: fetchPrice
  };
}

/**
 * Hook for multiple Oracle prices
 */
export function useOraclePrices(symbols: string[]) {
  const [prices, setPrices] = useState<OraclePriceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = async () => {
    if (!symbols.length) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await hederaApiService.getAggregatedPrices(symbols);
      setPrices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    // Refresh prices every 15 seconds
    const interval = setInterval(fetchPrices, 15000);
    return () => clearInterval(interval);
  }, [symbols]);

  return {
    prices,
    loading,
    error,
    refetch: fetchPrices
  };
}

/**
 * Hook for HCS (Hedera Consensus Service) operations
 */
export function useHCS(topicId?: string) {
  const [messages, setMessages] = useState<any[]>([]);
  const [topicInfo, setTopicInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    if (!topicId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const [messagesData, topicData] = await Promise.all([
        hederaApiService.getHCSMessages(topicId, 50),
        hederaApiService.getTopicInfo(topicId)
      ]);
      
      setMessages(messagesData);
      setTopicInfo(topicData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch HCS data');
    } finally {
      setLoading(false);
    }
  };

  const submitMessage = async (data: any) => {
    if (!topicId) throw new Error('No topic ID provided');
    
    try {
      setError(null);
      const result = await hederaApiService.submitToHCS(topicId, data);
      await fetchMessages(); // Refresh messages after submission
      return result;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to submit message';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  };

  useEffect(() => {
    fetchMessages();
    // Refresh messages every 20 seconds
    const interval = setInterval(fetchMessages, 20000);
    return () => clearInterval(interval);
  }, [topicId]);

  return {
    messages,
    topicInfo,
    loading,
    error,
    refetch: fetchMessages,
    submitMessage
  };
}

/**
 * Hook for Oracle network statistics
 */
export function useOracleStats() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await hederaApiService.getOracleStats();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch oracle stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Refresh stats every 60 seconds
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
}

/**
 * Hook for Hedera network status
 */
export function useHederaNetwork() {
  const [networkStatus, setNetworkStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNetworkStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const status = await hederaApiService.getNetworkStatus();
      setNetworkStatus(status);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch network status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNetworkStatus();
    // Check network status every 30 seconds
    const interval = setInterval(fetchNetworkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return {
    networkStatus,
    loading,
    error,
    refetch: fetchNetworkStatus
  };
}

/**
 * Utility hook for Hedera formatting
 */
export function useHederaUtils() {
  const formatHbar = (amount: number): string => {
    if (amount >= 1000000) return `${(amount / 1000000).toFixed(2)}M ℏ`;
    if (amount >= 1000) return `${(amount / 1000).toFixed(2)}K ℏ`;
    return `${amount.toFixed(4)} ℏ`;
  };

  const formatAccountId = (accountId: string): string => {
    // Format as 0.0.123456
    if (accountId.includes('.')) return accountId;
    return `0.0.${accountId}`;
  };

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getTransactionUrl = (transactionId: string, network: 'testnet' | 'mainnet' = 'testnet'): string => {
    const baseUrl = network === 'mainnet' 
      ? 'https://hashscan.io/mainnet/transaction' 
      : 'https://hashscan.io/testnet/transaction';
    return `${baseUrl}/${transactionId}`;
  };

  const getAccountUrl = (accountId: string, network: 'testnet' | 'mainnet' = 'testnet'): string => {
    const baseUrl = network === 'mainnet' 
      ? 'https://hashscan.io/mainnet/account' 
      : 'https://hashscan.io/testnet/account';
    return `${baseUrl}/${accountId}`;
  };

  return {
    formatHbar,
    formatAccountId,
    formatTimestamp,
    getTransactionUrl,
    getAccountUrl
  };
}