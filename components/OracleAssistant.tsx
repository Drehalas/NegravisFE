'use client';

import { useState, useEffect } from 'react';
import { useOracleQuery, usePrice, useWeather } from '@/hooks/useOracleApi';
import { formatCurrency, formatTimestamp, getConfidenceColor } from '@/lib/utils';

interface QueryResult {
  id: string;
  query: string;
  provider: string;
  result: any;
  timestamp: number;
  confidence?: number;
  sources?: string[];
  blockchain?: {
    transaction_id: string;
    hash: string;
    network: string;
    verified: boolean;
    explorer_link: string;
  };
}

export default function OracleAssistant() {
  const [query, setQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('chainlink');
  const [results, setResults] = useState<QueryResult[]>([]);
  const [activeTab, setActiveTab] = useState<'general' | 'price' | 'weather'>('general');

  const { queryOracle, loading: queryLoading, error: queryError } = useOracleQuery();
  const { getPrice, loading: priceLoading, error: priceError } = usePrice();
  const { getWeather, loading: weatherLoading, error: weatherError } = useWeather();

  const providers = [
    { id: 'chainlink', name: 'Chainlink', icon: '🔗' },
    { id: 'coingecko', name: 'CoinGecko', icon: '🦎' },
    { id: 'weather', name: 'Weather APIs', icon: '🌤️' },
    { id: 'nasa', name: 'NASA', icon: '🚀' },
    { id: 'wikipedia', name: 'Wikipedia', icon: '📚' }
  ];

  const handleQuery = async () => {
    if (!query.trim()) return;

    try {
      let result;
      const timestamp = Date.now();

      if (activeTab === 'price') {
        const symbol = query.toUpperCase();
        result = await getPrice(symbol);
        if (result.success) {
          const queryResult: QueryResult = {
            id: `price-${timestamp}`,
            query: `${symbol} Price`,
            provider: 'price',
            result: result.data,
            timestamp,
            confidence: result.data.confidence,
            sources: result.data.sources
          };
          setResults(prev => [queryResult, ...prev]);
        }
      } else if (activeTab === 'weather') {
        result = await getWeather(query);
        if (result.success) {
          const queryResult: QueryResult = {
            id: `weather-${timestamp}`,
            query: `Weather in ${query}`,
            provider: 'weather',
            result: result.data,
            timestamp,
            confidence: result.data.confidence,
            sources: result.data.sources
          };
          setResults(prev => [queryResult, ...prev]);
        }
      } else {
        result = await queryOracle(selectedProvider, query);
        if (result.success) {
          const queryResult: QueryResult = {
            id: `general-${timestamp}`,
            query,
            provider: selectedProvider,
            result: result.query_info || result.data,
            timestamp,
            confidence: result.query_info?.consensus?.confidence,
            sources: result.query_info?.sources?.map((s: any) => s.name) || [],
            blockchain: result.blockchain
          };
          setResults(prev => [queryResult, ...prev]);
        }
      }
    } catch (error) {
      console.error('Query error:', error);
    }

    setQuery('');
  };

  const renderResult = (result: QueryResult) => {
    switch (result.provider) {
      case 'price':
        return (
          <div className="space-y-2">
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(result.result.price)}
            </div>
            {result.result.market_data && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Market Cap:</span>
                  <div className="font-medium">{formatCurrency(result.result.market_data.market_cap)}</div>
                </div>
                <div>
                  <span className="text-gray-500">24h Volume:</span>
                  <div className="font-medium">{formatCurrency(result.result.market_data.volume_24h)}</div>
                </div>
              </div>
            )}
          </div>
        );
      
      case 'weather':
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{result.result.weather.icon}</span>
              <div>
                <div className="text-xl font-bold">{result.result.temperature}°C</div>
                <div className="text-sm text-gray-500">{result.result.weather.description}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Feels like:</span>
                <div className="font-medium">{result.result.feels_like}°C</div>
              </div>
              <div>
                <span className="text-gray-500">Humidity:</span>
                <div className="font-medium">{result.result.humidity}%</div>
              </div>
              <div>
                <span className="text-gray-500">Wind:</span>
                <div className="font-medium">{result.result.wind.speed} m/s</div>
              </div>
              <div>
                <span className="text-gray-500">Pressure:</span>
                <div className="font-medium">{result.result.pressure} hPa</div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-2">
            {result.result.answer ? (
              <div className="text-gray-800">{result.result.answer}</div>
            ) : (
              <pre className="text-sm bg-gray-50 p-2 rounded overflow-auto">
                {JSON.stringify(result.result, null, 2)}
              </pre>
            )}
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Oracle Assistant</h2>
          <p className="text-gray-600 mt-1">Query real-time data from multiple oracle providers</p>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex">
            {[
              { id: 'general', label: 'General Query', icon: '🔍' },
              { id: 'price', label: 'Crypto Prices', icon: '💰' },
              { id: 'weather', label: 'Weather', icon: '🌤️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Query Interface */}
        <div className="p-6">
          <div className="space-y-4">
            {activeTab === 'general' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Oracle Provider
                </label>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {providers.map((provider) => (
                    <option key={provider.id} value={provider.id}>
                      {provider.icon} {provider.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {activeTab === 'price' ? 'Cryptocurrency Symbol (e.g., BTC, ETH)' :
                 activeTab === 'weather' ? 'Location (e.g., New York, London)' :
                 'Query'}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleQuery()}
                  placeholder={
                    activeTab === 'price' ? 'Enter symbol (BTC, ETH, etc.)' :
                    activeTab === 'weather' ? 'Enter city or location' :
                    'Ask anything...'
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleQuery}
                  disabled={queryLoading || priceLoading || weatherLoading || !query.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {(queryLoading || priceLoading || weatherLoading) ? 'Querying...' : 'Query'}
                </button>
              </div>
            </div>

            {(queryError || priceError || weatherError) && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">
                  {queryError || priceError || weatherError}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="p-6 border-t bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Query Results ({results.length})
          </h3>
          
          {results.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No queries yet. Start by asking a question above!
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {results.map((result) => (
                <div key={result.id} className="bg-white rounded-lg p-4 border">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{result.query}</h4>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <span>{providers.find(p => p.id === result.provider)?.name || result.provider}</span>
                        <span>•</span>
                        <span>{formatTimestamp(result.timestamp / 1000)}</span>
                        {result.confidence && (
                          <>
                            <span>•</span>
                            <span className={getConfidenceColor(result.confidence)}>
                              {(result.confidence * 100).toFixed(1)}% confidence
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {renderResult(result)}
                  
                  {result.sources && result.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="text-sm text-gray-500">
                        Sources: {result.sources.join(', ')}
                      </div>
                    </div>
                  )}
                  
                  {result.blockchain && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="text-sm text-gray-500">
                        <span className="text-green-600">✓</span> Verified on {result.blockchain.network}
                        <a 
                          href={result.blockchain.explorer_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-600 hover:underline"
                        >
                          View Transaction
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}