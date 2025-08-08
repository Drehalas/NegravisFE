/**
 * TypeScript interfaces and types for Negravis Oracle Platform
 */

// Core Hedera Types
export interface HederaAccount {
  accountId: string;
  balance: number;
  publicKey: string;
  isConnected: boolean;
  evmAddress?: string;
  alias?: string;
}

export interface HederaTransaction {
  transactionId: string;
  type: 'transfer' | 'contract_call' | 'topic_submit' | 'file_create' | 'account_update';
  status: 'pending' | 'success' | 'failed';
  timestamp: string;
  fee: number;
  fromAccount: string;
  toAccount?: string;
  amount?: number;
  memo?: string;
  consensusTimestamp?: string;
}

// Oracle Types
export interface OracleProvider {
  id: string;
  accountId: string;
  name: string;
  endpoint: string;
  isActive: boolean;
  reliability: number;
  lastUpdate: string;
  specialties: string[];
  location: string;
  responseTime: number;
  successRate: number;
}

export interface OraclePriceData {
  symbol: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  volume24h: number;
  marketCap: number;
  lastUpdate: string;
  source: string;
  confidence: number;
  providers: string[];
}

export interface OracleQuery {
  id: string;
  query: string;
  provider: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
  result?: any;
  confidence?: number;
  consensusMethod: 'median' | 'weighted' | 'majority';
}

// HCS Types
export interface HCSMessage {
  id: string;
  topicId: string;
  sequenceNumber: number;
  consensusTimestamp: string;
  message: string;
  runningHash: string;
  payerAccountId: string;
  chunkInfo?: {
    number: number;
    total: number;
    scheduledTransactionId?: string;
  };
}

export interface HCSTopic {
  topicId: string;
  memo: string;
  adminKey?: string;
  submitKey?: string;
  autoRenewAccount?: string;
  autoRenewPeriod?: number;
  expirationTime?: string;
  sequenceNumber: number;
  runningHash: string;
}

// Smart Contract Types
export interface SmartContract {
  contractId: string;
  evmAddress: string;
  adminKey?: string;
  memo: string;
  balance: number;
  deleted: boolean;
  createdTimestamp: string;
  maxAutomaticTokenAssociations: number;
  proxyAccountId?: string;
  autoRenewAccountId?: string;
  autoRenewPeriod?: number;
  contractStateSize: number;
}

export interface ContractFunction {
  name: string;
  selector: string;
  inputs: ContractParameter[];
  outputs: ContractParameter[];
  stateMutability: 'pure' | 'view' | 'nonpayable' | 'payable';
}

export interface ContractParameter {
  name: string;
  type: string;
  indexed?: boolean;
}

// File Service Types
export interface HFSFile {
  fileId: string;
  size: number;
  expirationTime: string;
  deleted: boolean;
  keys: {
    adminKeys?: string[];
    contentKeys?: string[];
  };
  memo?: string;
}

// Dashboard & Analytics Types
export interface DashboardMetrics {
  totalQueries: number;
  activeProviders: number;
  averageResponseTime: number;
  successRate: number;
  totalValueLocked: number;
  networkHealth: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface PerformanceMetric {
  timestamp: string;
  value: number;
  change?: number;
  changePercent?: number;
}

export interface ChartDataPoint {
  timestamp: string;
  value: number;
  label?: string;
}

// UI Component Types
export interface NavigationItem {
  name: string;
  href: string;
  icon?: string;
  dropdown?: NavigationItem[];
  external?: boolean;
}

export interface ServiceFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  status: 'active' | 'beta' | 'coming_soon';
}

export interface APIEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  title: string;
  description: string;
  parameters: Record<string, {
    type: string;
    required: boolean;
    description: string;
    default?: any;
  }>;
  example: string;
  response?: string;
}

// Network Status Types
export interface NetworkStatus {
  network: 'testnet' | 'mainnet';
  status: 'online' | 'offline' | 'degraded' | 'maintenance';
  latestTimestamp: string;
  nodeCount: number;
  averageLatency: number;
  throughput: number;
  consensusTps: number;
}

// Error Types
export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// Response Wrapper Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  metadata?: {
    page?: number;
    limit?: number;
    total?: number;
    hasMore?: boolean;
  };
}

// Pagination Types
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Search Types
export interface SearchParams {
  query: string;
  type?: 'account' | 'transaction' | 'topic' | 'contract' | 'token';
  filters?: Record<string, any>;
}

// Theme Types
export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  border: string;
}

// User Preferences
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  currency: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  dashboard: {
    refreshInterval: number;
    defaultView: string;
    widgets: string[];
  };
}

// Real-time Data Types
export interface RealTimeUpdate {
  type: 'price' | 'transaction' | 'status' | 'alert';
  data: any;
  timestamp: string;
  source: string;
}

// Analytics Types
export interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  timestamp: string;
  userId?: string;
  sessionId: string;
}

export interface AnalyticsData {
  pageViews: number;
  uniqueUsers: number;
  avgSessionDuration: number;
  bounceRate: number;
  topPages: Array<{
    path: string;
    views: number;
    uniqueViews: number;
  }>;
}