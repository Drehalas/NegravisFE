'use client';

import { useState, useEffect } from 'react';
import { Search, ExternalLink, Verified, Clock, TrendingUp } from 'lucide-react';

export default function HashScanShowcase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'account' | 'transaction' | 'topic'>('transaction');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const mockData = {
    transaction: {
      id: '0.0.12345@1704067200.123456789',
      type: 'Oracle Query',
      status: 'Success',
      timestamp: '2024-01-01T00:00:00Z',
      fee: '0.0001 HBAR',
      explorer_url: '#'
    },
    account: {
      id: '0.0.98765',
      balance: '1,234.5678 HBAR',
      transactions: 847,
      created: '2023-06-15T10:30:00Z'
    },
    topic: {
      id: '0.0.54321',
      name: 'Oracle Data Feed',
      messages: 15420,
      submit_key: 'ED25519:...',
      admin_key: 'ED25519:...'
    }
  };

  const recentTransactions = [
    {
      id: '0.0.12345@1704067200.123456789',
      type: 'Oracle Query',
      amount: '0.0001 HBAR',
      status: 'Success',
      time: '2 mins ago'
    },
    {
      id: '0.0.12346@1704067140.987654321',
      type: 'Consensus Submit',
      amount: '0.0002 HBAR', 
      status: 'Success',
      time: '5 mins ago'
    },
    {
      id: '0.0.12347@1704067080.456789123',
      type: 'Account Update',
      amount: '0.0001 HBAR',
      status: 'Success',
      time: '8 mins ago'
    }
  ];

  if (!mounted) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full mb-4">
            <Search className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 font-medium">HashScan Integration</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Blockchain Explorer Analytics</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Integrated HashScan explorer provides real-time blockchain analytics, transaction verification, and comprehensive network monitoring.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Search Interface */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
              <div className="bg-gray-700 px-6 py-4 border-b border-gray-600">
                <h3 className="font-semibold mb-4">Explorer Search</h3>
                <div className="flex gap-2 mb-4">
                  {(['transaction', 'account', 'topic'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSearchType(type)}
                      className={`px-3 py-1 rounded text-sm transition-colors capitalize ${
                        searchType === type
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search ${searchType}...`}
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:border-purple-500"
                  />
                  <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded transition-colors">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {searchType === 'transaction' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold">Transaction Details</h4>
                      <span className="flex items-center gap-1 text-green-400">
                        <Verified className="w-4 h-4" />
                        Verified
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Transaction ID:</span>
                        <div className="font-mono text-purple-400">{mockData.transaction.id}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Type:</span>
                        <div>{mockData.transaction.type}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Status:</span>
                        <div className="text-green-400">{mockData.transaction.status}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Fee:</span>
                        <div>{mockData.transaction.fee}</div>
                      </div>
                    </div>
                    <a 
                      href="#" 
                      className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300"
                    >
                      View on HashScan <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}

                {searchType === 'account' && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Account Information</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Account ID:</span>
                        <div className="font-mono text-purple-400">{mockData.account.id}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Balance:</span>
                        <div className="text-green-400">{mockData.account.balance}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Transactions:</span>
                        <div>{mockData.account.transactions.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Created:</span>
                        <div>{new Date(mockData.account.created).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>
                )}

                {searchType === 'topic' && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">HCS Topic Details</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-gray-400">Topic ID:</span>
                        <div className="font-mono text-purple-400">{mockData.topic.id}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Name:</span>
                        <div>{mockData.topic.name}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Messages:</span>
                        <div className="text-green-400">{mockData.topic.messages.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden h-fit">
            <div className="bg-gray-700 px-6 py-4 border-b border-gray-600">
              <h3 className="font-semibold">Recent Transactions</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {recentTransactions.map((tx, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded border border-gray-600">
                    <div>
                      <div className="text-sm font-medium">{tx.type}</div>
                      <div className="text-xs text-gray-400">{tx.time}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-green-400">{tx.amount}</div>
                      <div className="text-xs text-green-400">{tx.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Network Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 text-center">
            <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-2xl font-bold">2.8s</div>
            <div className="text-gray-400 text-sm">Avg Consensus Time</div>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 text-center">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-2xl font-bold">847k</div>
            <div className="text-gray-400 text-sm">Total Transactions</div>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 text-center">
            <Verified className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <div className="text-2xl font-bold">99.9%</div>
            <div className="text-gray-400 text-sm">Network Uptime</div>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 text-center">
            <Search className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <div className="text-2xl font-bold">24/7</div>
            <div className="text-gray-400 text-sm">Real-time Monitoring</div>
          </div>
        </div>
      </div>
    </section>
  );
}