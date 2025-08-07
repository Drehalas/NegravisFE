'use client';

export default function HCSTopics() {
  const topics = [
    {
      id: '0.0.12345678',
      name: 'Oracle Audit Topic',
      description: 'Audit trail for all oracle data submissions and consensus decisions',
      messageCount: '1,247,893',
      dailyMessages: '4,521',
      lastMessage: '15s ago',
      status: 'active',
      chunking: 'enabled'
    },
    {
      id: '0.0.12345679',
      name: 'Compute Audit Topic',
      description: 'Track smart contract executions and computational tasks',
      messageCount: '892,456',
      dailyMessages: '2,834',
      lastMessage: '42s ago',
      status: 'active',
      chunking: 'enabled'
    },
    {
      id: '0.0.12345680',
      name: 'Account Audit Topic',
      description: 'Monitor account creations, transactions, and balance changes',
      messageCount: '2,156,789',
      dailyMessages: '7,892',
      lastMessage: '8s ago',
      status: 'active',
      chunking: 'disabled'
    },
    {
      id: '0.0.12345681',
      name: 'System Metrics Topic',
      description: 'System performance, uptime, and health monitoring data',
      messageCount: '456,123',
      dailyMessages: '1,234',
      lastMessage: '2m ago',
      status: 'warning',
      chunking: 'enabled'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">HCS Audit Topics</h2>
            <p className="text-gray-600 text-sm mt-1">4 custom topics for comprehensive system auditing</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 whitespace-nowrap cursor-pointer">
            Create Topic
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {topics.map((topic, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{topic.name}</h3>
                  <span className={`w-3 h-3 rounded-full ${
                    topic.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{topic.id}</p>
                <p className="text-sm text-gray-600">{topic.description}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{topic.messageCount}</div>
                <div className="text-sm text-gray-600">Total Messages</div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{topic.dailyMessages}</div>
                <div className="text-sm text-gray-600">Daily Messages</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <span>Last message: {topic.lastMessage}</span>
              <div className="flex items-center space-x-2">
                <span>Chunking:</span>
                <span className={`font-medium ${
                  topic.chunking === 'enabled' ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {topic.chunking}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-100 cursor-pointer">
                View Messages
              </button>
              <button className="w-10 h-10 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-200 cursor-pointer">
                <i className="ri-settings-3-line"></i>
              </button>
              <button className="w-10 h-10 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-200 cursor-pointer">
                <i className="ri-download-2-line"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">4.2s</div>
            <div className="text-sm text-gray-600">Avg Consensus Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">99.8%</div>
            <div className="text-sm text-gray-600">Message Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">1024B</div>
            <div className="text-sm text-gray-600">Message Chunk Size</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">5s</div>
            <div className="text-sm text-gray-600">Batch Timeout</div>
          </div>
        </div>
      </div>
    </div>
  );
}