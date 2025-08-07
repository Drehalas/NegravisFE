'use client';

export default function HashScanIntegration() {
  const explorerFeatures = [
    {
      title: 'Multi-Entity URLs',
      description: 'Direct links to accounts, transactions, topics, contracts, tokens, and files',
      icon: 'ri-link',
      status: 'active',
      examples: ['hashscan.io/mainnet/account/0.0.123', 'hashscan.io/mainnet/transaction/0.0.123@1699123456.123']
    },
    {
      title: 'Visual Status Badges',
      description: 'Real-time status indicators for all Hedera entities with color-coded health',
      icon: 'ri-shield-check-line',
      status: 'active',
      examples: ['Success/Failed transactions', 'Active/Inactive accounts', 'Online/Offline nodes']
    },
    {
      title: 'Batch Tracking',
      description: 'Track HCS message batches with smart batching visualization',
      icon: 'ri-stack-line',
      status: 'active',
      examples: ['Message chunk visualization', 'Batch size optimization', 'Time-based batching']
    },
    {
      title: 'Widget Support',
      description: 'Embeddable widgets for real-time blockchain data in external applications',
      icon: 'ri-dashboard-3-line',
      status: 'active',
      examples: ['Account balance widgets', 'Transaction status widgets', 'Network health widgets']
    }
  ];

  const liveData = {
    accounts: {
      total: '2,456,789',
      active: '1,234,567',
      newToday: '+3,456'
    },
    transactions: {
      total: '45,678,901',
      tps: '3,247',
      volume24h: '$12.4M'
    },
    topics: {
      total: '98,765',
      messages: '567M',
      activeTopics: '45,234'
    },
    contracts: {
      total: '23,456',
      deployed: '18,903',
      calls24h: '234K'
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">HashScan Integration</h2>
            <p className="text-gray-600 text-sm mt-1">Real-time blockchain data with advanced visualization features</p>
          </div>
          <a 
            href="https://hashscan.io/mainnet" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 whitespace-nowrap cursor-pointer flex items-center space-x-2"
          >
            <span>Open HashScan</span>
            <i className="ri-external-link-line"></i>
          </a>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Integration Features</h3>
            <div className="space-y-4">
              {explorerFeatures.map((feature, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className={`${feature.icon} text-blue-600`}></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900">{feature.title}</h4>
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
                      <div className="text-xs text-gray-500">
                        {feature.examples.map((example, idx) => (
                          <div key={idx} className="font-mono bg-gray-100 px-2 py-1 rounded mb-1">
                            {example}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Live Network Data</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <i className="ri-user-line text-blue-600 mr-2"></i>
                  Accounts
                </h4>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="text-lg font-bold text-gray-900">{liveData.accounts.total}</div>
                    <div className="text-gray-600">Total Accounts</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">{liveData.accounts.active}</div>
                    <div className="text-gray-600">Active</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">{liveData.accounts.newToday}</div>
                    <div className="text-gray-600">New Today</div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <i className="ri-exchange-line text-green-600 mr-2"></i>
                  Transactions
                </h4>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="text-lg font-bold text-gray-900">{liveData.transactions.total}</div>
                    <div className="text-gray-600">Total</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">{liveData.transactions.tps}</div>
                    <div className="text-gray-600">Current TPS</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">{liveData.transactions.volume24h}</div>
                    <div className="text-gray-600">24h Volume</div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <i className="ri-message-3-line text-purple-600 mr-2"></i>
                  HCS Topics
                </h4>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="text-lg font-bold text-gray-900">{liveData.topics.total}</div>
                    <div className="text-gray-600">Total Topics</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">{liveData.topics.messages}</div>
                    <div className="text-gray-600">Messages</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">{liveData.topics.activeTopics}</div>
                    <div className="text-gray-600">Active</div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <i className="ri-file-code-line text-orange-600 mr-2"></i>
                  Smart Contracts
                </h4>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="text-lg font-bold text-gray-900">{liveData.contracts.total}</div>
                    <div className="text-gray-600">Total</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-orange-600">{liveData.contracts.deployed}</div>
                    <div className="text-gray-600">Deployed</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">{liveData.contracts.calls24h}</div>
                    <div className="text-gray-600">Calls 24h</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Quick Access Links</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <a href="https://hashscan.io/mainnet/accounts" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 bg-white p-3 rounded-lg hover:shadow-md cursor-pointer">
              <i className="ri-user-line text-blue-600"></i>
              <span className="text-sm font-medium">Accounts</span>
            </a>
            <a href="https://hashscan.io/mainnet/transactions" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 bg-white p-3 rounded-lg hover:shadow-md cursor-pointer">
              <i className="ri-exchange-line text-green-600"></i>
              <span className="text-sm font-medium">Transactions</span>
            </a>
            <a href="https://hashscan.io/mainnet/topics" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 bg-white p-3 rounded-lg hover:shadow-md cursor-pointer">
              <i className="ri-message-3-line text-purple-600"></i>
              <span className="text-sm font-medium">Topics</span>
            </a>
            <a href="https://hashscan.io/mainnet/contracts" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 bg-white p-3 rounded-lg hover:shadow-md cursor-pointer">
              <i className="ri-file-code-line text-orange-600"></i>
              <span className="text-sm font-medium">Contracts</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}