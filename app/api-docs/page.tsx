'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { Code, Copy, Play, Check, Book, Terminal, Zap } from 'lucide-react';

export default function ApiDocs() {
  const [activeEndpoint, setActiveEndpoint] = useState('query');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const endpoints = [
    {
      id: 'query',
      method: 'POST',
      path: '/api/oracle-manager/query',
      title: 'Oracle Query',
      description: 'Execute queries across multiple Oracle providers with consensus algorithms',
      parameters: {
        provider: { type: 'string', required: true, description: 'Oracle provider (chainlink, coingecko, weather, nasa, wikipedia)' },
        query: { type: 'string', required: true, description: 'Query string or symbol' },
        userId: { type: 'string', required: false, description: 'User identifier for tracking' }
      },
      example: `curl -X POST "https://negravis-app.vercel.app/api/oracle-manager/query" \\
  -H "Content-Type: application/json" \\
  -d '{
    "provider": "chainlink",
    "query": "BTC",
    "userId": "user123"
  }'`
    },
    {
      id: 'price',
      method: 'GET',
      path: '/api/oracles/price/{symbol}',
      title: 'Cryptocurrency Price',
      description: 'Get real-time cryptocurrency prices from multiple providers',
      parameters: {
        symbol: { type: 'string', required: true, description: 'Cryptocurrency symbol (BTC, ETH, etc.)' },
        sources: { type: 'array', required: false, description: 'Specific price sources to use' },
        method: { type: 'string', required: false, description: 'Consensus method (median, weighted, majority)' }
      },
      example: `curl -X GET "https://negravis-app.vercel.app/api/oracles/price/BTC?sources=chainlink,coingecko&method=weighted"`
    },
    {
      id: 'weather',
      method: 'GET',
      path: '/api/oracles/weather/{location}',
      title: 'Weather Data',
      description: 'Get current weather information for any location',
      parameters: {
        location: { type: 'string', required: true, description: 'City name or coordinates' }
      },
      example: `curl -X GET "https://negravis-app.vercel.app/api/oracles/weather/New%20York"`
    },
    {
      id: 'providers',
      method: 'GET',
      path: '/api/oracles/providers',
      title: 'Oracle Providers',
      description: 'Get status and metrics for all Oracle providers',
      parameters: {},
      example: `curl -X GET "https://negravis-app.vercel.app/api/oracles/providers"`
    },
    {
      id: 'status',
      method: 'GET',
      path: '/api/oracles/status',
      title: 'System Status',
      description: 'Get overall system health and status information',
      parameters: {},
      example: `curl -X GET "https://negravis-app.vercel.app/api/oracles/status"`
    }
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const activeEndpointData = endpoints.find(ep => ep.id === activeEndpoint);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">API Documentation</h1>
          <p className="text-gray-600 mt-2">
            Comprehensive API reference for Negravis Oracle services with real-time data and blockchain integration
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Endpoints</h3>
              <nav className="space-y-2">
                {endpoints.map((endpoint) => (
                  <button
                    key={endpoint.id}
                    onClick={() => setActiveEndpoint(endpoint.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeEndpoint === endpoint.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded font-mono ${
                        endpoint.method === 'GET' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {endpoint.method}
                      </span>
                      <span className="text-sm font-medium">{endpoint.title}</span>
                    </div>
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Quick Links</h4>
                <div className="space-y-2">
                  <a href="#authentication" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600">
                    <Book className="w-4 h-4" />
                    Authentication
                  </a>
                  <a href="#rate-limits" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600">
                    <Zap className="w-4 h-4" />
                    Rate Limits
                  </a>
                  <a href="#webhooks" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600">
                    <Terminal className="w-4 h-4" />
                    Webhooks
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeEndpointData && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                {/* Header */}
                <div className="border-b border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-md text-sm font-mono ${
                      activeEndpointData.method === 'GET' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {activeEndpointData.method}
                    </span>
                    <code className="text-lg font-mono text-gray-800">{activeEndpointData.path}</code>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{activeEndpointData.title}</h2>
                  <p className="text-gray-600">{activeEndpointData.description}</p>
                </div>

                {/* Parameters */}
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Parameters</h3>
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