/**
 * Dynamic Data Hooks for Negravis Oracle Platform
 * TypeScript-first hooks with caching and real-time updates
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { dataService } from '@/data/Data';
import {
  OracleProvider,
  OraclePriceData,
  DashboardMetrics,
  HederaTransaction,
  NetworkStatus,
  ApiResponse
} from '@/data/types';

// Generic hook for data fetching with caching
function useAsyncData<T>(
  fetcher: () => Promise<T>,
  dependencies: any[] = [],
  options: {
    refreshInterval?: number;
    retryCount?: number;
    retryDelay?: number;
  } = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  const { refreshInterval, retryCount = 3, retryDelay = 1000 } = options;
  const retryCountRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  const fetchData = useCallback(async (isRetry = false) => {
    try {
      if (!isRetry) {
        setLoading(true);
        setError(null);
      }
      
      const result = await fetcher();
      setData(result);
      setLastUpdated(new Date());
      retryCountRef.current = 0;
      
      if (!isRetry) {
        setLoading(false);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      
      if (retryCountRef.current < retryCount) {
        retryCountRef.current++;
        setTimeout(() => fetchData(true), retryDelay * retryCountRef.current);
      } else {
        setError(errorMessage);
        setLoading(false);
      }
    }
  }, [fetcher, retryCount, retryDelay]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();

    if (refreshInterval) {
      intervalRef.current = setInterval(() => {
        fetchData(true); // Background refresh
      }, refreshInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, dependencies);

  return {
    data,
    loading,
    error,
    refresh,
    lastUpdated,
    isStale: lastUpdated ? (Date.now() - lastUpdated.getTime()) > (refreshInterval || 60000) : false
  };
}

// Oracle Providers Hook
export function useOracleProviders() {
  return useAsyncData(
    () => dataService.getOracleProviders(),
    [],
    { refreshInterval: 15000 } // Refresh every 15 seconds
  );
}

// Price Data Hook
export function usePriceData(symbol: string) {
  return useAsyncData(
    () => dataService.getPriceData(symbol),
    [symbol],
    { refreshInterval: 5000 } // Refresh every 5 seconds for prices
  );
}

// Multiple Price Data Hook
export function useMultiplePriceData(symbols: string[]) {
  const [prices, setPrices] = useState<Record<string, OraclePriceData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const pricePromises = symbols.map(async (symbol) => {
          const price = await dataService.getPriceData(symbol);
          return [symbol, price] as const;
        });
        
        const results = await Promise.allSettled(pricePromises);
        const newPrices: Record<string, OraclePriceData> = {};
        
        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
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
    };

    if (symbols.length > 0) {
      fetchPrices();
      const interval = setInterval(fetchPrices, 5000);
      return () => clearInterval(interval);
    }
  }, [symbols]);

  return { prices, loading, error };
}

// Dashboard Metrics Hook
export function useDashboardMetrics() {
  return useAsyncData(
    () => dataService.getDashboardMetrics(),
    [],
    { refreshInterval: 10000 } // Refresh every 10 seconds
  );
}

// Network Status Hook
export function useNetworkStatus() {
  return useAsyncData(
    () => dataService.getNetworkStatus(),
    [],
    { refreshInterval: 5000 } // Refresh every 5 seconds
  );
}

// Transactions Hook
export function useTransactions(accountId?: string, limit: number = 10) {
  return useAsyncData(
    () => dataService.getTransactions(accountId, limit),
    [accountId, limit],
    { refreshInterval: 30000 } // Refresh every 30 seconds
  );
}

// Real-time Data Hook with WebSocket simulation
export function useRealTimeData<T>(
  topic: string,
  initialData?: T
) {
  const [data, setData] = useState<T | undefined>(initialData);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate WebSocket connection
    const connectToRealTime = () => {
      setConnected(true);
      setError(null);
      
      // Simulate receiving real-time updates
      const interval = setInterval(() => {
        // Generate mock real-time updates based on topic
        if (topic === 'prices') {
          // Simulate price updates
          setData((prev) => {
            if (prev && typeof prev === 'object' && 'price' in prev) {
              const fluctuation = (Math.random() - 0.5) * 0.01;
              return {
                ...prev,
                price: (prev.price as number) * (1 + fluctuation),
                lastUpdate: new Date().toISOString()
              } as T;
            }
            return prev;
          });
        }
      }, 2000);

      return () => {
        clearInterval(interval);
        setConnected(false);
      };
    };

    const cleanup = connectToRealTime();
    return cleanup;
  }, [topic]);

  return {
    data,
    connected,
    error,
    subscribe: (callback: (data: T) => void) => {
      // In a real implementation, this would subscribe to WebSocket events
      console.log(`Subscribing to ${topic}`, callback);
    }
  };
}

// Paginated Data Hook
export function usePaginatedData<T>(
  fetcher: (page: number, limit: number) => Promise<{ data: T[]; total: number; hasMore: boolean }>,
  initialLimit: number = 10
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const loadData = useCallback(async (pageNum: number, reset = false) => {
    if (loading) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const result = await fetcher(pageNum, initialLimit);
      
      setData(prev => reset ? result.data : [...prev, ...result.data]);
      setHasMore(result.hasMore);
      setTotal(result.total);
      setPage(pageNum);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [fetcher, initialLimit, loading]);

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      loadData(page + 1);
    }
  }, [hasMore, loading, page, loadData]);

  const refresh = useCallback(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
    loadData(1, true);
  }, [loadData]);

  useEffect(() => {
    loadData(1, true);
  }, []);

  return {
    data,
    loading,
    error,
    hasMore,
    total,
    loadMore,
    refresh,
    page
  };
}

// Search Hook
export function useSearch<T>(
  searchFn: (query: string) => Promise<T[]>,
  debounceMs: number = 500
) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!query.trim()) {
      setResults([]);
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);
        const searchResults = await searchFn(query);
        setResults(searchResults);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed');
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, searchFn, debounceMs]);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    clearResults: () => {
      setQuery('');
      setResults([]);
    }
  };
}

// Cache Management Hook
export function useCacheManager() {
  const [stats, setStats] = useState({ size: 0, keys: [] });

  const updateStats = useCallback(() => {
    setStats(dataService.getCacheStats());
  }, []);

  const clearCache = useCallback((key?: string) => {
    dataService.clearCache(key);
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