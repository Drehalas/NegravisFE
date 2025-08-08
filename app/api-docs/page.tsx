'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { Code, Copy, Play, Check, Book, Terminal, Zap } from 'lucide-react';

export default function ApiDocs() {
  const [activeEndpoint, setActiveEndpoint] = useState('account');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const endpoints = [
    {
      id: 'account',
      method: 'GET',
      path: '/api/hedera/account/{accountId}',
      title: 'Get Account Info',
      description: 'Retrieve Hedera account information including balance and status',
      parameters: {
        accountId: { type: 'string', required: true, description: 'Hedera account ID (e.g., 0.0.123456)' }
      },
      example: `curl -X GET "https://api.negravis.com/api/hedera/account/0.0.123456"`
    },
    {
      id: 'balance',
      method: 'GET',
      path: '/api/hedera/account/{accountId}/balance',
      title: 'Account Balance',
      description: 'Get current HBAR balance for a Hedera account',
      parameters: {
        accountId: { type: 'string', required: true, description: 'Hedera account ID' }
      },
      example: `curl -X GET "https://api.negravis.com/api/hedera/account/0.0.123456/balance"`
    },
    {
      id: 'transactions',
      method: 'GET',
      path: '/api/hedera/account/{accountId}/transactions',
      title: 'Transaction History',
      description: 'Get transaction history for a Hedera account',
      parameters: {
        accountId: { type: 'string', required: true, description: 'Hedera account ID' },
        limit: { type: 'number', required: false, description: 'Number of transactions to return (default: 10)' }
      },
      example: `curl -X GET "https://api.negravis.com/api/hedera/account/0.0.123456/transactions?limit=20"`
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
    },
    {
      id: 'hcs-messages',
      method: 'GET',
      path: '/api/hedera/hcs/topic/{topicId}/messages',
      title: 'Get HCS Messages',
      description: 'Retrieve messages from a Hedera Consensus Service topic',
      parameters: {
        topicId: { type: 'string', required: true, description: 'HCS topic ID' },
        limit: { type: 'number', required: false, description: 'Number of messages to return (default: 10)' }
      },
      example: `curl -X GET "https://api.negravis.com/api/hedera/hcs/topic/0.0.789012/messages?limit=50"`
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
      example: `curl -X GET "https://api.negravis.com/api/oracle/price/BTC"`
    },
    {
      id: 'oracle-providers',
      method: 'GET',
      path: '/api/oracle/providers',
      title: 'Oracle Providers',
      description: 'Get list of active Oracle providers on Hedera network',
      parameters: {},
      example: `curl -X GET "https://api.negravis.com/api/oracle/providers"`
    },
    {
      id: 'oracle-submit',
      method: 'POST',
      path: '/api/oracle/submit',
      title: 'Submit Oracle Data',
      description: 'Submit price data to Oracle network (for authorized providers)',
      parameters: {
        symbol: { type: 'string', required: true, description: 'Asset symbol' },
        price: { type: 'number', required: true, description: 'Current price' },
        metadata: { type: 'object', required: false, description: 'Additional metadata' }
      },
      example: `curl -X POST "https://api.negravis.com/api/oracle/submit" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "symbol": "BTC",
    "price": 45000.50,
    "metadata": {
      "source": "exchange_api",
      "confidence": 0.95
    }
  }'`
    },
    {
      id: 'wallet-connect',
      method: 'POST',
      path: '/api/hedera/wallet/connect',
      title: 'Connect Wallet',
      description: 'Initiate connection to Hedera wallet (HashPack, Blade)',
      parameters: {
        walletType: { type: 'string', required: false, description: 'Preferred wallet type (hashpack, blade)' }
      },
      example: `curl -X POST "https://api.negravis.com/api/hedera/wallet/connect" \\
  -H "Content-Type: application/json" \\
  -d '{
    "walletType": "hashpack"
  }'`
    },
    {
      id: 'network-status',
      method: 'GET',
      path: '/api/hedera/network/status',
      title: 'Network Status',
      description: 'Get Hedera network status and health information',
      parameters: {},
      example: `curl -X GET "https://api.negravis.com/api/hedera/network/status"`
    }
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const activeEndpointData = endpoints.find(ep => ep.id === activeEndpoint);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Hedera API Documentation</h1>
          <p className="text-gray-300 mt-2">
            Comprehensive API reference for Negravis Oracle platform built on Hedera Hashgraph with HCS integration
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/80 backdrop-blur-lg rounded-xl shadow-sm border border-purple-500/20 p-6">
              <h3 className="font-semibold text-white mb-4">Endpoints</h3>
              <nav className="space-y-2">
                {endpoints.map((endpoint) => (
                  <button
                    key={endpoint.id}
                    onClick={() => setActiveEndpoint(endpoint.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeEndpoint === endpoint.id
                        ? 'bg-purple-600 text-white border border-purple-500'
                        : 'text-gray-300 hover:bg-purple-700/30 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded font-mono ${
                        endpoint.method === 'GET' ? 'bg-green-600/20 text-green-400' : 'bg-blue-600/20 text-blue-400'
                      }`}>
                        {endpoint.method}
                      </span>
                      <span className="text-sm font-medium">{endpoint.title}</span>
                    </div>
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-purple-500/20">
                <h4 className="font-medium text-white mb-3">Quick Links</h4>
                <div className="space-y-2">
                  <a href="#authentication" className="flex items-center gap-2 text-sm text-gray-300 hover:text-purple-300">
                    <Book className="w-4 h-4" />
                    Hedera Integration
                  </a>
                  <a href="#rate-limits" className="flex items-center gap-2 text-sm text-gray-300 hover:text-purple-300">
                    <Zap className="w-4 h-4" />
                    HCS Topics
                  </a>
                  <a href="#webhooks" className="flex items-center gap-2 text-sm text-gray-300 hover:text-purple-300">
                    <Terminal className="w-4 h-4" />
                    Oracle Network
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeEndpointData && (
              <div className="bg-gray-900/80 backdrop-blur-lg rounded-xl shadow-sm border border-purple-500/20">
                {/* Header */}
                <div className="border-b border-purple-500/20 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-md text-sm font-mono ${
                      activeEndpointData.method === 'GET' ? 'bg-green-600/20 text-green-400' : 'bg-blue-600/20 text-blue-400'
                    }`}>
                      {activeEndpointData.method}
                    </span>
                    <code className="text-lg font-mono text-purple-300">{activeEndpointData.path}</code>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">{activeEndpointData.title}</h2>
                  <p className="text-gray-300">{activeEndpointData.description}</p>
                </div>

                {/* Parameters */}
                <div className="p-6 border-b border-purple-500/20">
                  <h3 className="text-lg font-semibold text-white mb-4">Parameters</h3>
                  {Object.keys(activeEndpointData.parameters).length > 0 ? (
                    <div className="space-y-4">
                      {Object.entries(activeEndpointData.parameters).map(([key, param]) => (
                        <div key={key} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <code className="text-blue-600 font-mono">{key}</code>
                              <span className={`text-xs px-2 py-1 rounded ${
                                param.required ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {param.required ? 'required' : 'optional'}
                              </span>
                              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                                {param.type}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{param.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No parameters required</p>
                  )}
                </div>

                {/* Example */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Example Request</h3>
                    <button
                      onClick={() => copyToClipboard(activeEndpointData.example, activeEndpointData.id)}
                      className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      {copiedCode === activeEndpointData.id ? (
                        <>
                          <Check className="w-4 h-4 text-green-600" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-gray-900 rounded-lg overflow-hidden">
                    <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="ml-4 text-sm text-gray-400">Terminal</span>
                      </div>
                    </div>
                    <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
                      <code>{activeEndpointData.example}</code>
                    </pre>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-3">Example Response</h4>
                    <div className="bg-gray-900 rounded-lg overflow-hidden">
                      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                        <span className="text-sm text-gray-400">JSON Response</span>
                      </div>
                      <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
                        <code>{JSON.stringify({
                          success: true,
                          data: {
                            query: activeEndpointData.id === 'query' ? 'BTC' : undefined,
                            result: activeEndpointData.id === 'price' ? 42345.67 : 'Sample result data',
                            confidence: 0.95,
                            consensus_method: 'weighted_average',
                            sources: ['chainlink', 'coingecko'],
                            timestamp: Date.now(),
                            execution_time_ms: 245
                          },
                          blockchain: {
                            transaction_id: '0.0.12345@1704067200.123456789',
                            hash: '0xa1b2c3d4e5f6...',
                            network: 'hedera-testnet',
                            verified: true,
                            explorer_link: 'https://hashscan.io/testnet/transaction/...'
                          }
                        }, null, 2)}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Information */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentication</h3>
                <div className="space-y-3">
                  <p className="text-gray-600">
                    Currently, the API is open for testing. In production, API keys will be required.
                  </p>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-blue-700 text-sm">
                      <strong>Coming Soon:</strong> API key authentication and rate limiting
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Rate Limits</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Requests per minute:</span>
                    <span className="font-mono">60</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Requests per hour:</span>
                    <span className="font-mono">1,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Concurrent requests:</span>
                    <span className="font-mono">10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}