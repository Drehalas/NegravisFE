'use client';

import { useState, useEffect } from 'react';
import { useProviders, usePrice } from '@/hooks/useOracleApi';
import { formatCurrency, getStatusColor, getConfidenceColor } from '@/lib/utils';

export default function OracleMetrics() {
  const [btcPrice, setBtcPrice] = useState<any>(null);
  const [providers, setProviders] = useState<any>(null);
  const { getPrice } = usePrice();
  const { getProviders } = useProviders();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch BTC price and providers data
        const [priceResult, providersResult] = await Promise.all([
          getPrice('BTC'),
          getProviders()
        ]);
        
        if (priceResult.success) {
          setBtcPrice(priceResult.data);
        }
        
        if (providersResult.success) {
          setProviders(providersResult.data);
        }
      } catch (error) {
        console.error('Error fetching Oracle metrics:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [getPrice, getProviders]);

  // Fallback data for demonstration
  const fallbackOracles = [
    { name: 'Chainlink', price: '$42,234.56', change: '+2.3%', status: 'active', confidence: 98 },
    { name: 'CoinGecko', price: '$42,198.23', change: '+2.1%', status: 'active', confidence: 96 },
    { name: 'Band Protocol', price: '$42,267.89', change: '+2.4%', status: 'active', confidence: 94 },
    { name: 'Chronicle', price: '$42,189.45', change: '+1.9%', status: 'active', confidence: 92 },
    { name: 'Tellor', price: '$42,245.67', change: '+2.2%', status: 'warning', confidence: 87 }
  ];

  const displayOracles = providers?.providers ? 
    providers.providers.slice(0, 5).map((provider: any) => ({
      name: provider.name,
      price: btcPrice ? formatCurrency(btcPrice.price) : '$42,000.00',
      change: btcPrice?.market_data ? `${btcPrice.market_data.change_24h > 0 ? '+' : ''}${btcPrice.market_data.change_24h.toFixed(1)}%` : '+2.1%',
      status: provider.healthy ? 'active' : 'warning',
      confidence: Math.round(provider.reliability * 100)
    })) : fallbackOracles;

  const consensusPrice = btcPrice ? btcPrice.price : 42223.45;
  const consensusChange = btcPrice?.market_data?.change_24h || 2.2;

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Oracle Data Feeds</h3>
        <p className="text-gray-600 text-sm mt-1">
          Real-time BTC price feeds from {providers?.total_providers || 9} oracle providers
        </p>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {displayOracles.map((oracle, index) => (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  oracle.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
                <div>
                  <h4 className="font-medium text-gray-900">{oracle.name}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">{oracle.price}</span>
                    <span className={`text-sm font-medium ${
                      oracle.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>{oracle.change}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${getConfidenceColor(oracle.confidence / 100)}`}>
                  {oracle.confidence}%
                </div>
                <div className="text-xs text-gray-500">confidence</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">Consensus Price (BTC)</h4>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {formatCurrency(consensusPrice)}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Algorithm: Weighted Average</div>
              <div className={`text-sm font-medium mt-1 ${
                consensusChange > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {consensusChange > 0 ? '+' : ''}{consensusChange.toFixed(1)}% (24h)
              </div>
            </div>
          </div>
          {providers && (
            <div className="mt-3 pt-3 border-t border-blue-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  Active Providers: {providers.active_providers}/{providers.total_providers}
                </span>
                <span className="text-blue-600 font-medium">
                  System Health: {Math.round((providers.active_providers / providers.total_providers) * 100)}%
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}