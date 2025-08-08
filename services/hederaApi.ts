/**
 * Hedera Hashgraph API Service Integration
 * For Negravis Oracle Platform
 */

export interface HederaAccount {
  accountId: string;
  balance: number;
  publicKey: string;
  isConnected: boolean;
}

export interface HederaTransaction {
  transactionId: string;
  status: 'pending' | 'success' | 'failed';
  timestamp: string;
  fee: number;
  type: 'transfer' | 'contract_call' | 'topic_submit' | 'file_create';
}

export interface OracleDataSubmission {
  topicId: string;
  data: any;
  timestamp: string;
  submitterId: string;
  consensusTimestamp?: string;
}

export interface HCSTopicInfo {
  topicId: string;
  memo: string;
  submitKey?: string;
  adminKey?: string;
  createdAt: string;
  messageCount: number;
}

export interface OracleProvider {
  accountId: string;
  name: string;
  endpoint: string;
  isActive: boolean;
  reliability: number;
  lastUpdate: string;
  specialties: string[];
}

export interface OraclePriceData {
  symbol: string;
  price: number;
  change24h: number;
  volume: number;
  marketCap: number;
  lastUpdate: string;
  source: string;
}

class HederaApiService {
  private baseUrl: string;
  private network: 'testnet' | 'mainnet';
  
  constructor(
    baseUrl: string = process.env.NEXT_PUBLIC_HEDERA_API_URL || 'http://localhost:3001',
    network: 'testnet' | 'mainnet' = 'testnet'
  ) {
    this.baseUrl = baseUrl;
    this.network = network;
  }

  /**
   * Get Hedera account information
   */
  async getAccount(accountId: string): Promise<HederaAccount> {
    const response = await fetch(`${this.baseUrl}/api/hedera/account/${accountId}`);
    if (!response.ok) {
      throw new Error(`Failed to get account: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get account balance in HBAR
   */
  async getAccountBalance(accountId: string): Promise<{ balance: number; currency: string }> {
    const response = await fetch(`${this.baseUrl}/api/hedera/account/${accountId}/balance`);
    if (!response.ok) {
      throw new Error(`Failed to get balance: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get transaction history for an account
   */
  async getTransactionHistory(accountId: string, limit = 10): Promise<HederaTransaction[]> {
    const response = await fetch(
      `${this.baseUrl}/api/hedera/account/${accountId}/transactions?limit=${limit}`
    );
    if (!response.ok) {
      throw new Error(`Failed to get transactions: ${response.statusText}`);
    }
    const data = await response.json();
    return data.transactions || [];
  }

  /**
   * Submit data to Hedera Consensus Service topic
   */
  async submitToHCS(topicId: string, data: any): Promise<{ transactionId: string; status: string }> {
    const response = await fetch(`${this.baseUrl}/api/hedera/hcs/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topicId, data }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to submit to HCS: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get messages from HCS topic
   */
  async getHCSMessages(topicId: string, limit = 10): Promise<OracleDataSubmission[]> {
    const response = await fetch(
      `${this.baseUrl}/api/hedera/hcs/topic/${topicId}/messages?limit=${limit}`
    );
    if (!response.ok) {
      throw new Error(`Failed to get HCS messages: ${response.statusText}`);
    }
    const data = await response.json();
    return data.messages || [];
  }

  /**
   * Get HCS topic information
   */
  async getTopicInfo(topicId: string): Promise<HCSTopicInfo> {
    const response = await fetch(`${this.baseUrl}/api/hedera/hcs/topic/${topicId}`);
    if (!response.ok) {
      throw new Error(`Failed to get topic info: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get list of oracle providers
   */
  async getOracleProviders(): Promise<OracleProvider[]> {
    const response = await fetch(`${this.baseUrl}/api/oracle/providers`);
    if (!response.ok) {
      throw new Error(`Failed to get oracle providers: ${response.statusText}`);
    }
    const data = await response.json();
    return data.providers || [];
  }

  /**
   * Get current price data from oracles
   */
  async getOraclePriceData(symbol: string): Promise<OraclePriceData> {
    const response = await fetch(`${this.baseUrl}/api/oracle/price/${symbol}`);
    if (!response.ok) {
      throw new Error(`Failed to get price data: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get aggregated oracle data for multiple assets
   */
  async getAggregatedPrices(symbols: string[]): Promise<OraclePriceData[]> {
    const response = await fetch(`${this.baseUrl}/api/oracle/prices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ symbols }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to get aggregated prices: ${response.statusText}`);
    }
    const data = await response.json();
    return data.prices || [];
  }

  /**
   * Submit oracle data (for oracle providers)
   */
  async submitOracleData(
    symbol: string, 
    price: number, 
    metadata: any
  ): Promise<{ success: boolean; transactionId?: string }> {
    const response = await fetch(`${this.baseUrl}/api/oracle/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ symbol, price, metadata }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to submit oracle data: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get oracle network statistics
   */
  async getOracleStats(): Promise<{
    totalProviders: number;
    activeProviders: number;
    totalDataPoints: number;
    avgReliability: number;
    networkHealth: string;
  }> {
    const response = await fetch(`${this.baseUrl}/api/oracle/stats`);
    if (!response.ok) {
      throw new Error(`Failed to get oracle stats: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Connect to Hedera wallet (HashPack, Blade, etc.)
   */
  async connectWallet(): Promise<{ success: boolean; accountId?: string; error?: string }> {
    try {
      // Check if HashPack is available
      if (typeof window !== 'undefined' && (window as any).hashpack) {
        const hashpack = (window as any).hashpack;
        const result = await hashpack.connectToLocalWallet();
        
        if (result.success) {
          return {
            success: true,
            accountId: result.accountIds[0]
          };
        }
      }
      
      // Check if Blade wallet is available
      if (typeof window !== 'undefined' && (window as any).bladeWallet) {
        const blade = (window as any).bladeWallet;
        const result = await blade.connect();
        
        if (result.success) {
          return {
            success: true,
            accountId: result.accountId
          };
        }
      }
      
      return {
        success: false,
        error: 'No Hedera wallet found. Please install HashPack or Blade wallet.'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Wallet connection failed'
      };
    }
  }

  /**
   * Get Hedera network status
   */
  async getNetworkStatus(): Promise<{
    network: string;
    status: 'online' | 'offline' | 'degraded';
    latestTimestamp: string;
    nodeCount: number;
  }> {
    const response = await fetch(`${this.baseUrl}/api/hedera/network/status`);
    if (!response.ok) {
      throw new Error(`Failed to get network status: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Search transactions by criteria
   */
  async searchTransactions(criteria: {
    accountId?: string;
    type?: string;
    startDate?: string;
    endDate?: string;
    limit?: number;
  }): Promise<HederaTransaction[]> {
    const params = new URLSearchParams();
    Object.entries(criteria).forEach(([key, value]) => {
      if (value) params.append(key, value.toString());
    });
    
    const response = await fetch(`${this.baseUrl}/api/hedera/transactions/search?${params}`);
    if (!response.ok) {
      throw new Error(`Failed to search transactions: ${response.statusText}`);
    }
    const data = await response.json();
    return data.transactions || [];
  }
}

export const hederaApiService = new HederaApiService();
export default hederaApiService;