'use client';

export default function ConsensusAlgorithms() {
  const algorithms = [
    {
      name: 'Weighted Average',
      description: 'Weight oracle data by reliability and stake amount',
      usage: '67%',
      pairs: 'BTC/USD, ETH/USD, HBAR/USD',
      status: 'active'
    },
    {
      name: 'Median Consensus',
      description: 'Use median value to filter outliers effectively',
      usage: '23%',
      pairs: 'ADA/USD, DOT/USD',
      status: 'active'
    },
    {
      name: 'Majority Vote',
      description: 'Consensus based on majority oracle agreement',
      usage: '8%',
      pairs: 'LINK/USD',
      status: 'active'
    },
    {
      name: 'Confidence Weighted',
      description: 'Weight by confidence scores and historical accuracy',
      usage: '2%',
      pairs: 'Testing feeds',
      status: 'testing'
    }
  ];

  const outlierFilters = [
    { name: '3-Sigma Rule', description: 'Remove values beyond 3 standard deviations', active: true },
    { name: '30% Deviation', description: 'Filter prices deviating >30% from median', active: true },
    { name: 'Historical Variance', description: 'Based on oracle historical accuracy', active: false },
    { name: 'Time-based Filter', description: 'Remove stale data older than threshold', active: true }
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Consensus Algorithms</h2>
          <p className="text-gray-600 text-sm mt-1">Multiple algorithms for reliable price consensus</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {algorithms.map((algorithm, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{algorithm.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    algorithm.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {algorithm.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{algorithm.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Usage: {algorithm.usage}</span>
                  <span className="text-blue-600">{algorithm.pairs}</span>
                </div>
                <div className="mt-3 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{width: algorithm.usage}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Outlier Filtering</h2>
          <p className="text-gray-600 text-sm mt-1">Advanced filters to remove unreliable data points</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {outlierFilters.map((filter, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{filter.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{filter.description}</p>
                </div>
                <div className="ml-4">
                  <button 
                    className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${
                      filter.active ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      filter.active ? 'translate-x-6' : 'translate-x-1'
                    }`}></div>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Filter Performance</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-600">Outliers Filtered:</span>
                <span className="font-medium ml-2">2.3%</span>
              </div>
              <div>
                <span className="text-blue-600">Accuracy Improved:</span>
                <span className="font-medium ml-2">+4.7%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}