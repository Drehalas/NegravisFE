/**
 * Main Data file for Negravis Oracle Platform
 * Contains both static mock data and dynamic data fetching functions
 */

import {
  OracleProvider,
  OraclePriceData,
  HederaTransaction,
  ServiceFeature,
  APIEndpoint,
  NavigationItem,
  DashboardMetrics,
  HCSMessage,
  SmartContract,
  NetworkStatus,
  HFSFile
} from './types';

// ==================== NAVIGATION DATA ====================
export const navigationData: NavigationItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Use Cases', href: '/use-cases' },
  {
    name: 'Platform',
    href: '#',
    dropdown: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Oracle Assistant', href: '/oracles' },
      { name: 'Analytics', href: '/analytics' },
      { name: 'Explorer', href: '/explorer' },
      { name: 'Consensus', href: '/consensus' }
    ]
  },
  {
    name: 'Resources',
    href: '#',
    dropdown: [
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/api-docs' },
      { name: 'Tutorials', href: '/tutorials' },
      { name: 'Best Practices', href: '/best-practices' }
    ]
  }
];

// ==================== ORACLE PROVIDERS DATA ====================
export const mockOracleProviders: OracleProvider[] = [
  {
    id: 'chainlink-001',
    accountId: '0.0.123456',
    name: 'Chainlink Node Alpha',
    endpoint: 'https://oracle-alpha.chainlink.network',
    isActive: true,
    reliability: 0.98,
    lastUpdate: new Date().toISOString(),
    specialties: ['Crypto Prices', 'Stock Market', 'Commodities'],
    location: 'New York, US',
    responseTime: 120,
    successRate: 99.2
  },
  {
    id: 'coingecko-001',
    accountId: '0.0.123457',
    name: 'CoinGecko Feed',
    endpoint: 'https://oracle.coingecko.com',
    isActive: true,
    reliability: 0.96,
    lastUpdate: new Date(Date.now() - 5000).toISOString(),
    specialties: ['Cryptocurrency', 'DeFi Tokens', 'Market Data'],
    location: 'Singapore',
    responseTime: 95,
    successRate: 98.8
  },
  {
    id: 'band-protocol-001',
    accountId: '0.0.123458',
    name: 'Band Protocol Oracle',
    endpoint: 'https://oracle.bandprotocol.com',
    isActive: true,
    reliability: 0.94,
    lastUpdate: new Date(Date.now() - 2000).toISOString(),
    specialties: ['Cross-chain Data', 'Real World Assets', 'Sports'],
    location: 'Bangkok, TH',
    responseTime: 150,
    successRate: 97.5
  },
  {
    id: 'chronicle-001',
    accountId: '0.0.123459',
    name: 'Chronicle Protocol',
    endpoint: 'https://oracle.chroniclelabs.org',
    isActive: true,
    reliability: 0.92,
    lastUpdate: new Date(Date.now() - 8000).toISOString(),
    specialties: ['DeFi Primitives', 'Yield Farming', 'Liquidity'],
    location: 'London, UK',
    responseTime: 180,
    successRate: 96.8
  },
  {
    id: 'tellor-001',
    accountId: '0.0.123460',
    name: 'Tellor Oracle',
    endpoint: 'https://oracle.tellor.io',
    isActive: false,
    reliability: 0.87,
    lastUpdate: new Date(Date.now() - 300000).toISOString(),
    specialties: ['Custom Queries', 'IoT Data', 'Weather'],
    location: 'Chicago, US',
    responseTime: 220,
    successRate: 94.2
  }
];

// ==================== PRICE DATA ====================
export const mockPriceData: Record<string, OraclePriceData> = {
  BTC: {
    symbol: 'BTC',
    price: 42345.67,
    change24h: 1250.34,
    changePercent24h: 3.04,
    volume24h: 28500000000,
    marketCap: 825000000000,
    lastUpdate: new Date().toISOString(),
    source: 'Aggregated',
    confidence: 0.98,
    providers: ['chainlink-001', 'coingecko-001', 'band-protocol-001']
  },
  ETH: {
    symbol: 'ETH',
    price: 2678.90,
    change24h: -45.12,
    changePercent24h: -1.66,
    volume24h: 15200000000,
    marketCap: 320000000000,
    lastUpdate: new Date().toISOString(),
    source: 'Aggregated',
    confidence: 0.97,
    providers: ['chainlink-001', 'coingecko-001', 'chronicle-001']
  },
  HBAR: {
    symbol: 'HBAR',
    price: 0.08945,
    change24h: 0.00234,
    changePercent24h: 2.69,
    volume24h: 125000000,
    marketCap: 3200000000,
    lastUpdate: new Date().toISOString(),
    source: 'Aggregated',
    confidence: 0.95,
    providers: ['coingecko-001', 'band-protocol-001']
  }
};

// ==================== SERVICES DATA ====================
export const servicesData: ServiceFeature[] = [
  {
    id: 'consensus-service',
    title: 'Hedera Consensus Service',
    description: 'Immutable message ordering and timestamping for Oracle data verification',
    icon: 'MessageSquare',
    features: ['Sub-3s Finality', '10,000+ TPS', 'Byzantine Fault Tolerance', 'Cryptographic Proofs'],
    status: 'active'
  },
  {
    id: 'oracle-network',
    title: 'Decentralized Oracle Network',
    description: 'Multi-provider data aggregation with consensus algorithms',
    icon: 'Network',
    features: ['9 Active Providers', 'Real-time Aggregation', 'Weighted Consensus', '99.8% Uptime'],
    status: 'active'
  },
  {
    id: 'smart-contracts',
    title: 'Smart Contract Integration',
    description: 'Solidity-compatible contracts for automated Oracle operations',
    icon: 'Code',
    features: ['EVM Compatible', 'Gas Optimization', 'Proxy Patterns', 'Automated Updates'],
    status: 'active'
  },
  {
    id: 'file-service',
    title: 'Hedera File Service',
    description: 'Secure document storage with encryption and compliance',
    icon: 'FileText',
    features: ['AES-256 Encryption', 'GDPR/HIPAA Compliant', 'Immutable Audit Trail', 'Access Control'],
    status: 'active'
  },
  {
    id: 'price-feeds',
    title: 'Real-time Price Feeds',
    description: 'Cryptocurrency and traditional asset price data streams',
    icon: 'TrendingUp',
    features: ['Sub-second Updates', 'Multi-source Validation', 'Historical Data', 'Custom Pairs'],
    status: 'active'
  },
  {
    id: 'api-gateway',
    title: 'API Gateway',
    description: 'RESTful and GraphQL APIs for seamless integration',
    icon: 'Globe',
    features: ['REST & GraphQL', 'Rate Limiting', 'Authentication', 'SDK Support'],
    status: 'active'
  }
];

// ==================== API ENDPOINTS DATA ====================
export const apiEndpointsData: APIEndpoint[] = [
  {
    id: 'account-info',
    method: 'GET',
    path: '/api/hedera/account/{accountId}',
    title: 'Get Account Info',
    description: 'Retrieve Hedera account information including balance and status',
    parameters: {
      accountId: { type: 'string', required: true, description: 'Hedera account ID (e.g., 0.0.123456)' }
    },
    example: 'curl -X GET "https://api.negravis.com/api/hedera/account/0.0.123456"',
    response: JSON.stringify({
      accountId: '0.0.123456',
      balance: 150.2500,
      publicKey: '302a300506032b657003210033c...',
      isConnected: true
    }, null, 2)
  },
  {
    id: 'oracle-price',
    method: 'GET',
    path: '/api/oracle/price/{symbol}',
    title: 'Oracle Price Data',
    description: 'Get real-time price data from Oracle network on Hedera',
    parameters: {
      symbol: { type: 'string', required: true, description: 'Asset symbol (BTC, ETH, HBAR, etc.)' }
    },
    example: 'curl -X GET "https://api.negravis.com/api/oracle/price/BTC"',
    response: JSON.stringify({
      symbol: 'BTC',
      price: 42345.67,
      change24h: 1250.34,
      confidence: 0.98,
      lastUpdate: '2024-01-15T10:30:00Z'
    }, null, 2)
  },
  {
    id: 'hcs-submit',
    method: 'POST',
    path: '/api/hedera/hcs/submit',
    title: 'Submit to HCS Topic',
    description: 'Submit data to Hedera Consensus Service topic',
    parameters: {
      topicId: { type: 'string', required: true, description: 'HCS topic ID (e.g., 0.0.789012)' },
      data: { type: 'object', required: true, description: 'Data to submit to the topic' }
    },
    example: `curl -X POST "https://api.negravis.com/api/hedera/hcs/submit" \\
  -H "Content-Type: application/json" \\
  -d '{
    "topicId": "0.0.789012",
    "data": {
      "symbol": "BTC",
      "price": 45000,
      "timestamp": "2024-01-15T10:30:00Z"
    }
  }'`
  }
];

// ==================== DASHBOARD METRICS ====================
export const mockDashboardMetrics: DashboardMetrics = {
  totalQueries: 1247852,
  activeProviders: 9,
  averageResponseTime: 125,
  successRate: 99.8,
  totalValueLocked: 45200000,
  networkHealth: 'excellent'
};

// ==================== MOCK TRANSACTIONS ====================
export const mockTransactions: HederaTransaction[] = [
  {
    transactionId: '0.0.12345@1704067200.123456789',
    type: 'topic_submit',
    status: 'success',
    timestamp: new Date(Date.now() - 120000).toISOString(),
    fee: 0.0001,
    fromAccount: '0.0.98765',
    memo: 'Oracle price update - BTC',
    consensusTimestamp: '1704067200.123456789'
  },
  {
    transactionId: '0.0.12346@1704067140.987654321',
    type: 'contract_call',
    status: 'success',
    timestamp: new Date(Date.now() - 300000).toISOString(),
    fee: 0.0025,
    fromAccount: '0.0.98765',
    toAccount: '0.0.55555',
    memo: 'Update price feed contract'
  },
  {
    transactionId: '0.0.12347@1704067080.456789123',
    type: 'transfer',
    status: 'success',
    timestamp: new Date(Date.now() - 480000).toISOString(),
    fee: 0.0001,
    fromAccount: '0.0.98765',
    toAccount: '0.0.11111',
    amount: 10.5,
    memo: 'Oracle payment'
  }
];

// ==================== NETWORK STATUS ====================
export const mockNetworkStatus: NetworkStatus = {
  network: 'testnet',
  status: 'online',
  latestTimestamp: new Date().toISOString(),
  nodeCount: 39,
  averageLatency: 0.3,
  throughput: 10000,
  consensusTps: 8500
};

// ==================== DYNAMIC DATA FUNCTIONS ====================
export class DataService {
  private static instance: DataService;
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map();
  private useBackend: boolean = true; // Toggle for backend vs mock data
  private dataSource: 'negravis-frontend' | 'zerog-backend' | 'mock' = 'negravis-frontend';
  
  static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  setBackendMode(enabled: boolean): void {
    this.useBackend = enabled;
    this.cache.clear(); // Clear cache when switching modes
  }

  setDataSource(source: 'negravis-frontend' | 'zerog-backend' | 'mock'): void {
    this.dataSource = source;
    this.cache.clear(); // Clear cache when switching data sources
  }

  getDataSource(): string {
    return this.dataSource;
  }

  private async fetchWithCache<T>(
    key: string, 
    fetcher: () => Promise<T>, 
    ttl: number = 30000
  ): Promise<T> {
    const cached = this.cache.get(key);
    const now = Date.now();
    
    if (cached && (now - cached.timestamp) < cached.ttl) {
      return cached.data;
    }
    
    try {
      const data = await fetcher();
      this.cache.set(key, { data, timestamp: now, ttl });
      return data;
    } catch (error) {
      // Return cached data if available, even if expired
      if (cached) {
        return cached.data;
      }
      throw error;
    }
  }

  async getOracleProviders(): Promise<OracleProvider[]> {
    return this.fetchWithCache(
      'oracle-providers',
      async () => {
        if (this.useBackend && this.dataSource !== 'mock') {
          // Priority 1: Try Negravis Frontend
          if (this.dataSource === 'negravis-frontend') {
            try {
              const { negravisFrontendApiService } = await import('@/services/negravisFrontendApi');
              const providers = await negravisFrontendApiService.getOracleProviders();
              console.log('✅ Using Negravis Frontend providers:', providers.length);
              return providers;
            } catch (error) {
              console.warn('Negravis Frontend unavailable, trying 0G backend:', error);
              // Fall through to 0G backend
            }
          }
          
          // Priority 2: Try 0G Backend
          if (this.dataSource === 'zerog-backend' || this.dataSource === 'negravis-frontend') {
            try {
              const { zeroGApiService } = await import('@/services/zeroGApi');
              const providers = await zeroGApiService.getServiceProviders();
              console.log('✅ Using 0G Backend providers:', providers.length);
              return providers;
            } catch (error) {
              console.warn('0G Backend unavailable, falling back to mock data:', error);
              // Fall through to mock data
            }
          }
        }
        
        // Priority 3: Mock data fallback
        console.log('📊 Using mock providers fallback');
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockOracleProviders.map(provider => ({
          ...provider,
          lastUpdate: new Date().toISOString(),
          responseTime: Math.floor(Math.random() * 100) + 80,
          reliability: Math.random() * 0.1 + 0.9
        }));
      },
      15000 // 15 second TTL
    );
  }

  async getPriceData(symbol: string): Promise<OraclePriceData> {
    return this.fetchWithCache(
      `price-${symbol}`,
      async () => {
        await new Promise(resolve => setTimeout(resolve, 200));
        const basePrice = mockPriceData[symbol];
        if (!basePrice) {
          throw new Error(`Price data not available for ${symbol}`);
        }
        
        // Simulate price fluctuations
        const fluctuation = (Math.random() - 0.5) * 0.02; // ±1%
        return {
          ...basePrice,
          price: basePrice.price * (1 + fluctuation),
          lastUpdate: new Date().toISOString()
        };
      },
      5000 // 5 second TTL for prices
    );
  }

  async getDashboardMetrics(): Promise<DashboardMetrics> {
    return this.fetchWithCache(
      'dashboard-metrics',
      async () => {
        if (this.useBackend && this.dataSource !== 'mock') {
          // Priority 1: Try Negravis Frontend
          if (this.dataSource === 'negravis-frontend') {
            try {
              const { negravisFrontendApiService } = await import('@/services/negravisFrontendApi');
              const metrics = await negravisFrontendApiService.getDashboardMetrics();
              console.log('✅ Using Negravis Frontend metrics');
              return metrics;
            } catch (error) {
              console.warn('Negravis Frontend metrics unavailable, trying 0G backend:', error);
              // Fall through to 0G backend
            }
          }
          
          // Priority 2: Try 0G Backend
          if (this.dataSource === 'zerog-backend' || this.dataSource === 'negravis-frontend') {
            try {
              const { zeroGApiService } = await import('@/services/zeroGApi');
              const metrics = await zeroGApiService.getDashboardMetrics();
              console.log('✅ Using 0G Backend metrics');
              return metrics;
            } catch (error) {
              console.warn('0G Backend metrics unavailable, falling back to mock data:', error);
              // Fall through to mock data
            }
          }
        }
        
        // Priority 3: Mock data fallback
        console.log('📊 Using mock metrics fallback');
        await new Promise(resolve => setTimeout(resolve, 300));
        return {
          ...mockDashboardMetrics,
          totalQueries: mockDashboardMetrics.totalQueries + Math.floor(Math.random() * 100),
          averageResponseTime: Math.floor(Math.random() * 50) + 100,
          successRate: 99.5 + Math.random() * 0.5
        };
      },
      10000 // 10 second TTL
    );
  }

  async getNetworkStatus(): Promise<NetworkStatus> {
    return this.fetchWithCache(
      'network-status',
      async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return {
          ...mockNetworkStatus,
          latestTimestamp: new Date().toISOString(),
          throughput: Math.floor(Math.random() * 2000) + 8000,
          consensusTps: Math.floor(Math.random() * 1500) + 7000
        };
      },
      5000 // 5 second TTL
    );
  }

  async getTransactions(accountId?: string, limit: number = 10): Promise<HederaTransaction[]> {
    return this.fetchWithCache(
      `transactions-${accountId || 'all'}-${limit}`,
      async () => {
        await new Promise(resolve => setTimeout(resolve, 400));
        return mockTransactions
          .filter(tx => !accountId || tx.fromAccount === accountId || tx.toAccount === accountId)
          .slice(0, limit)
          .map(tx => ({
            ...tx,
            timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString()
          }));
      },
      30000 // 30 second TTL
    );
  }

  // Clear cache manually
  clearCache(key?: string): void {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }

  // Get cache stats
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Export singleton instance
export const dataService = DataService.getInstance();