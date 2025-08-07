'use client';

export default function OracleProviders() {
  const providers = [
    {
      name: 'Chainlink',
      status: 'active',
      reliability: 99.8,
      avgResponseTime: '1.2s',
      dataPoints: 45,
      lastUpdate: '30s ago',
      priceDeviation: '+0.02%'
    },
    {
      name: 'Band Protocol',
      status: 'active',
      reliability: 99.5,
      avgResponseTime: '1.5s',
      dataPoints: 42,
      lastUpdate: '45s ago',
      priceDeviation: '-0.05%'
    },
    {
      name: 'API3',
      status: 'active',
      reliability: 99.2,
      avgResponseTime: '1.8s',
      dataPoints: 38,
      lastUpdate: '1m ago',
      priceDeviation: '+0.08%'
    },
    {
      name: 'Chronicle',
      status: 'active',
      reliability: 98.9,
      avgResponseTime: '2.1s',
      dataPoints: 35,
      lastUpdate: '1m ago',
      priceDeviation: '-0.12%'
    },
    {
      name: 'Tellor',
      status: 'warning',
      reliability: 96.8,
      avgResponseTime: '3.2s',
      dataPoints: 28,
      lastUpdate: '3m ago',
      priceDeviation: '+0.25%'
    },
    {
      name: 'DIA',
      status: 'active',
      reliability: 99.1,
      avgResponseTime: '1.9s',
      dataPoints: 40,
      lastUpdate: '1m ago',
      priceDeviation: '-0.03%'
    },
    {
      name: 'Pyth Network',
      status: 'active',
      reliability: 99.4,
      avgResponseTime: '1.4s',
      dataPoints: 43,
      lastUpdate: '40s ago',
      priceDeviation: '+0.01%'
    },
    {
      name: 'Flux Protocol',
      status: 'active',
      reliability: 98.7,
      avgResponseTime: '2.3s',
      dataPoints: 32,
      lastUpdate: '2m ago',
      priceDeviation: '-0.08%'
    },
    {
      name: 'Umbrella Network',
      status: 'active',
      reliability: 99.0,
      avgResponseTime: '1.7s',
      dataPoints: 37,
      lastUpdate: '1m ago',
      priceDeviation: '+0.04%'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 mb-8">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Oracle Providers</h2>
            <p className="text-gray-600 text-sm mt-1">9 active oracle providers with real-time monitoring</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 whitespace-nowrap cursor-pointer">
            Add Provider
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reliability</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Points</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Update</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {providers.map((provider, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                      <i className="ri-database-2-line text-white"></i>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{provider.name}</div>
                      <div className="text-sm text-gray-500">Oracle Provider</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    provider.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {provider.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm text-gray-900 font-medium">{provider.reliability}%</div>
                    <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{width: `${provider.reliability}%`}}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{provider.avgResponseTime}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{provider.dataPoints}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm text-gray-900">{provider.lastUpdate}</div>
                    <div className={`text-xs ${
                      provider.priceDeviation.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {provider.priceDeviation}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 cursor-pointer mr-3">Configure</button>
                  <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                    <i className="ri-more-2-line"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}