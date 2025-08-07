'use client';

import { useState, useCallback } from 'react';
import { oracleApi, type OracleQueryResponse, type PriceResponse, type WeatherResponse, type ProvidersResponse, type SystemStatusResponse } from '@/services/oracleApi';

export function useOracleQuery() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const queryOracle = useCallback(async (provider: string, query: string, userId?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await oracleApi.queryOracle(provider, query, userId);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return { queryOracle, loading, error };
}

export function usePrice() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPrice = useCallback(async (symbol: string, options?: { sources?: string[]; method?: string }): Promise<PriceResponse> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await oracleApi.getPrice(symbol, options);
      if (!result.success && result.error) {
        setError(result.error);
      }
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      return { success: false, error: errorMessage, data: {} as PriceResponse['data'] };
    } finally {
      setLoading(false);
    }
  }, []);

  return { getPrice, loading, error };
}

export function useWeather() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getWeather = useCallback(async (location: string): Promise<WeatherResponse> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await oracleApi.getWeather(location);
      if (!result.success && result.error) {
        setError(result.error);
      }
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      return { success: false, error: errorMessage, data: {} as WeatherResponse['data'] };
    } finally {
      setLoading(false);
    }
  }, []);

  return { getWeather, loading, error };
}

export function useProviders() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProviders = useCallback(async (): Promise<ProvidersResponse> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await oracleApi.getProviders();
      if (!result.success && result.error) {
        setError(result.error);
      }
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      return { success: false, error: errorMessage, data: {} as ProvidersResponse['data'] };
    } finally {
      setLoading(false);
    }
  }, []);

  return { getProviders, loading, error };
}

export function useSystemStatus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSystemStatus = useCallback(async (): Promise<SystemStatusResponse> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await oracleApi.getSystemStatus();
      if (!result.success && result.error) {
        setError(result.error);
      }
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      return { success: false, error: errorMessage, data: {} as SystemStatusResponse['data'] };
    } finally {
      setLoading(false);
    }
  }, []);

  return { getSystemStatus, loading, error };
}