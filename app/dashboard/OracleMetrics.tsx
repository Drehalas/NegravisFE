'use client';

export default function OracleMetrics() {
  const oracles = [
    { name: 'Chainlink', price: '$45,234.56', change: '+2.3%', status: 'active', confidence: 98 },
    { name: 'Band Protocol', price: '$45,198.23', change: '+2.1%', status: 'active', confidence: 96 },
    { name: 'API3', price: '$45,267.89', change: '+2.4%', status: 'active', confidence: 94 },
    { name: 'Chronicle', price: '$45,189.45', change: '+1.9%', status: 'active', confidence: 92 },
    { name: 'Tellor', price: '$45,245.67', change: '+2.2%', status: 'warning', confidence: 87 }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Oracle Data Feeds</h3>
        <p className="text-gray-600 text-sm mt-1">Real-time price feeds from 9 oracle providers</p>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {oracles.map((oracle, index) => (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  oracle.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
                <div>
                  <h4 className="font-medium text-gray-900">{oracle.name}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">{oracle.price}</span>
                    <span className="text-sm text-green-600 font-medium">{oracle.change}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{oracle.confidence}%</div>
                <div className="text-xs text-gray-500">confidence</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">Consensus Price</h4>
              <p className="text-2xl font-bold text-blue-600 mt-1">$45,223.45</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Algorithm: Weighted Average</div>
              <div className="text-sm text-green-600 font-medium mt-1">+2.2% (24h)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}