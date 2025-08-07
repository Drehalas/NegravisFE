'use client';

export default function DataFeeds() {
  const feeds = [
    { pair: 'BTC/USD', price: '$45,234.56', change: '+2.3%', sources: 9, lastUpdate: '30s', status: 'active' },
    { pair: 'ETH/USD', price: '$3,156.78', change: '+1.8%', sources: 9, lastUpdate: '45s', status: 'active' },
    { pair: 'HBAR/USD', price: '$0.0847', change: '+5.2%', sources: 8, lastUpdate: '1m', status: 'active' },
    { pair: 'ADA/USD', price: '$0.4923', change: '-0.8%', sources: 7, lastUpdate: '1m', status: 'active' },
    { pair: 'DOT/USD', price: '$7.34', change: '+3.1%', sources: 8, lastUpdate: '2m', status: 'warning' },
    { pair: 'LINK/USD', price: '$14.67', change: '+1.2%', sources: 9, lastUpdate: '45s', status: 'active' }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 mb-8">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Price Data Feeds</h2>
            <p className="text-gray-600 text-sm mt-1">Real-time cryptocurrency price feeds with consensus algorithms</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 whitespace-nowrap cursor-pointer">
            Add Feed
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {feeds.map((feed, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{feed.pair}</h3>
              <span className={`w-3 h-3 rounded-full ${
                feed.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
              }`}></span>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-bold text-gray-900">{feed.price}</div>
                <div className={`text-sm font-medium ${
                  feed.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {feed.change} (24h)
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Sources: {feed.sources}/9</span>
                <span>Updated: {feed.lastUpdate}</span>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-100 cursor-pointer">
                  View Details
                </button>
                <button className="w-10 h-10 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-200 cursor-pointer">
                  <i className="ri-settings-3-line"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}