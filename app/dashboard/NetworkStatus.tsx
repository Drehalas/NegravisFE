'use client';

export default function NetworkStatus() {
  const nodes = [
    { id: 'node-001', name: 'Hedera Node 1', status: 'online', stake: '2.4M ℏ', uptime: '99.9%' },
    { id: 'node-002', name: 'Hedera Node 2', status: 'online', stake: '2.1M ℏ', uptime: '99.8%' },
    { id: 'node-003', name: 'Hedera Node 3', status: 'warning', stake: '1.9M ℏ', uptime: '98.2%' },
    { id: 'node-004', name: 'Hedera Node 4', status: 'online', stake: '2.3M ℏ', uptime: '99.7%' }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Network Status</h3>
        <p className="text-gray-600 text-sm mt-1">Real-time Hedera network monitoring</p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {nodes.map((node) => (
            <div key={node.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  node.status === 'online' ? 'bg-green-500' : 
                  node.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <div>
                  <h4 className="font-medium text-gray-900">{node.name}</h4>
                  <p className="text-sm text-gray-600">Stake: {node.stake}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${
                  node.status === 'online' ? 'text-green-700' : 
                  node.status === 'warning' ? 'text-yellow-700' : 'text-red-700'
                }`}>
                  {node.status.charAt(0).toUpperCase() + node.status.slice(1)}
                </div>
                <div className="text-sm text-gray-600">{node.uptime} uptime</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">28</div>
            <div className="text-sm text-gray-600">Total Nodes</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">99.7%</div>
            <div className="text-sm text-gray-600">Network Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
}