'use client';

export default function MessageActivity() {
  const recentMessages = [
    {
      topicId: '0.0.12345678',
      topicName: 'Oracle Audit',
      sequenceNumber: 1247893,
      message: 'BTC/USD consensus reached: $45,234.56 (9/9 oracles)',
      timestamp: '15 seconds ago',
      size: '342 bytes',
      type: 'consensus'
    },
    {
      topicId: '0.0.12345680',
      topicName: 'Account Audit',
      sequenceNumber: 2156789,
      message: 'Account 0.0.987654 created with initial balance 100 ℏ',
      timestamp: '8 seconds ago',
      size: '198 bytes',
      type: 'account'
    },
    {
      topicId: '0.0.12345679',
      topicName: 'Compute Audit',
      sequenceNumber: 892456,
      message: 'PriceFeed contract executed: updatePrice() successful',
      timestamp: '42 seconds ago',
      size: '256 bytes',
      type: 'contract'
    },
    {
      topicId: '0.0.12345678',
      topicName: 'Oracle Audit',
      sequenceNumber: 1247892,
      message: 'ETH/USD data received from Chainlink: $3,156.78',
      timestamp: '1 minute ago',
      size: '278 bytes',
      type: 'data'
    },
    {
      topicId: '0.0.12345681',
      topicName: 'System Metrics',
      sequenceNumber: 456123,
      message: 'Network TPS: 3,247 | Node uptime: 99.9% | Memory: 78%',
      timestamp: '2 minutes ago',
      size: '189 bytes',
      type: 'metrics'
    },
    {
      topicId: '0.0.12345679',
      topicName: 'Compute Audit',
      sequenceNumber: 892455,
      message: 'Oracle contract deployed to 0.0.555666 successfully',
      timestamp: '3 minutes ago',
      size: '234 bytes',
      type: 'deployment'
    }
  ];

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'consensus': return 'ri-check-double-line';
      case 'account': return 'ri-user-line';
      case 'contract': return 'ri-file-code-line';
      case 'data': return 'ri-database-line';
      case 'metrics': return 'ri-bar-chart-line';
      case 'deployment': return 'ri-rocket-line';
      default: return 'ri-message-line';
    }
  };

  const getMessageColor = (type: string) => {
    switch (type) {
      case 'consensus': return 'text-green-600 bg-green-100';
      case 'account': return 'text-blue-600 bg-blue-100';
      case 'contract': return 'text-purple-600 bg-purple-100';
      case 'data': return 'text-orange-600 bg-orange-100';
      case 'metrics': return 'text-indigo-600 bg-indigo-100';
      case 'deployment': return 'text-pink-600 bg-pink-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Message Activity</h3>
        <p className="text-gray-600 text-sm mt-1">Live stream of HCS topic messages</p>
      </div>
      
      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {recentMessages.map((message, index) => (
          <div key={index} className="p-4 hover:bg-gray-50">
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getMessageColor(message.type)}`}>
                <i className={`${getMessageIcon(message.type)} text-sm`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">{message.topicName}</span>
                  <span className="text-xs text-gray-500">#{message.sequenceNumber}</span>
                  <span className="text-xs text-gray-400">{message.size}</span>
                </div>
                <p className="text-sm text-gray-700 mb-1">{message.message}</p>
                <p className="text-xs text-gray-500">{message.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Real-time message streaming</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-600">Live</span>
          </div>
        </div>
      </div>
    </div>
  );
}