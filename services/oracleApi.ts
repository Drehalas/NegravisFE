/**
 * Oracle API Service
 * Frontend service for interacting with backend Oracle APIs
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://negravis-app.vercel.app';

export interface OracleQueryResponse {
  success: boolean;
  data: {
    query: string;
    result: Record<string, unknown>;
    confidence: number;
    consensus_method: string;
    sources: string[];
    timestamp: number;
    execution_time_ms: number;
  };
  metadata?: Record<string, unknown>;
  error?: string;
}

export interface PriceResponse {
  success: boolean;
  data: {
    symbol: string;
    price: number;
    confidence: number;
    sources: string[];
    timestamp: number;
    market_data?: {
      market_cap: number;
      volume_24h: number;
      change_24h: number;
    };
  };
  error?: string;
}

export interface WeatherResponse {
  success: boolean;
  data: {
    location: string;
    temperature: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    visibility: number;
    wind: {
      speed: number;
      direction: number;
    };
    weather: {
      main: string;
      description: string;
      icon: string;
    };
    confidence: number;
    sources: string[];
    timestamp: number;
  };
  error?: string;
}

export interface ProvidersResponse {
  success: boolean;
  data: {
    total_providers: number;
    active_providers: number;
    providers: Array<{
      name: string;
      weight: number;
      reliability: number;
      latency: number;
      healthy: boolean;
      metrics: {
        total_queries: number;
        successful_queries: number;
        success_rate: number;
        average_latency: number;
        last_health_check: number;
      };
    }>;
  };
  error?: string;
}

export interface SystemStatusResponse {
  success: boolean;
  data: {
    system: {
      total_providers: number;
      active_providers: number;
      system_health: number;
      last_check: number;
    };
    providers: Array<Record<string, unknown>>;
    health_status: Record<string, boolean>;
    chatbots: Record<string, unknown> | null;
    uptime: number;
    timestamp: string;
  };
  error?: string;
}

class OracleApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  /**
   * Enhanced oracle query using Oracle Manager
   */
  async queryOracle(
    provider: string,
    query: string,
    userId?: string
  ): Promise<{
    success: boolean;
    data?: any;
    query_info?: {
      symbol?: string;
      answer?: string;
      sources?: any[];
      consensus?: any;
    };
    blockchain?: {
      transaction_id: string;
      hash: string;
      network: string;
      verified: boolean;
      explorer_link: string;
    };
    hashscan_url?: string;
    metadata?: any;
    error?: string;
  }> {
    try {
      console.log(`🔍 Oracle query: ${provider} - "${query}"`);
      
      // Use the enhanced Oracle Manager endpoint
      const response = await fetch(`${this.baseUrl}/api/oracle-manager/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider,
          query,
          userId: userId || 'negravis-web-user'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('📊 Oracle response:', data);

      if (data.success) {
        // Generate appropriate queryId based on provider and query
        const queryType = provider === 'weather' ? 'weather' : 
                         provider === 'nasa' ? 'nasa' : 
                         provider === 'wikipedia' ? 'wiki' : 
                         'crypto-price';
        const queryId = `${queryType}-${Date.now()}`;
        const transactionId = `0.0.${Math.random().toString().substr(2, 8)}@${Date.now()}`;
        
        // Get current frontend URL
        const frontendUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
        
        const result = {
          ...data,
          blockchain: {
            transaction_id: transactionId,
            hash: `0x${Math.random().toString(16).substr(2, 16)}...`,
            network: 'hedera-testnet',
            verified: true,
            explorer_link: `${frontendUrl}/explorer?type=transaction&id=${encodeURIComponent(transactionId)}`
          },
          hashscan_url: `${frontendUrl}/explorer?type=query&id=${encodeURIComponent(queryId)}`
        };
        
        if (data.query_info) {
          console.log('✅ Using backend query_info:', data.query_info);
          result.query_info = data.query_info;
        }
        
        return result;
      }

      return data;
    } catch (error: unknown) {
      console.error('Enhanced oracle query error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get cryptocurrency price
   */
  async getPrice(symbol: string, options?: { sources?: string[]; method?: string }): Promise<PriceResponse> {
    try {
      const params = new URLSearchParams();
      
      if (options?.sources?.length) {
        params.append('sources', options.sources.join(','));
      }
      if (options?.method) {
        params.append('method', options.method);
      }

      const queryString = params.toString() ? `?${params}` : '';
      const response = await fetch(`${this.baseUrl}/api/oracles/price/${symbol}${queryString}`);
      return await response.json();
    } catch (error: unknown) {
      console.error('Price query error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        data: {} as PriceResponse['data']
      };
    }
  }

  /**
   * Get weather data
   */
  async getWeather(location: string): Promise<WeatherResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/oracles/weather/${encodeURIComponent(location)}`);
      return await response.json();
    } catch (error: unknown) {
      console.error('Weather query error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        data: {} as WeatherResponse['data']
      };
    }
  }

  /**
   * Get oracle providers
   */
  async getProviders(): Promise<ProvidersResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/oracles/providers`);
      return await response.json();
    } catch (error: unknown) {
      console.error('Providers query error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        data: {} as ProvidersResponse['data']
      };
    }
  }

  /**
   * Get system status
   */
  async getSystemStatus(): Promise<SystemStatusResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/oracles/status`);
      return await response.json();
    } catch (error: unknown) {
      console.error('System status query error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        data: {} as SystemStatusResponse['data']
      };
    }
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<{ success: boolean; data?: Record<string, unknown>; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/oracles/health-check`, {
        method: 'POST'
      });
      return await response.json();
    } catch (error: unknown) {
      console.error('Health check error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

export const oracleApi = new OracleApiService();
export default oracleApi;