'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Clock, Shield, Zap } from 'lucide-react';

interface HCSMessage {
  id: string;
  type: string;
  content: string;
  timestamp: string;
  consensus: string;
  status: string;
}

export default function HCSShowcase() {
  const [activeMessage, setActiveMessage] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const messages: HCSMessage[] = [
    {
      id: '0.0.12345@1704067200.123456789',
      type: 'Oracle Query',
      content: 'BTC price aggregation from 5 providers',
      timestamp: '2024-01-01T00:00:00Z',
      consensus: 'Weighted Average',
      status: 'Verified'
    },
    {
      id: '0.0.12346@1704067260.987654321', 
      type: 'System Metrics',
      content: 'Provider health check: 9/9 active',
      timestamp: '2024-01-01T00:01:00Z',
      consensus: 'Majority Vote',
      status: 'Verified'
    },
    {
      id: '0.0.12347@1704067320.456789123',
      type: 'Account Activity',
      content: 'User authentication successful',
      timestamp: '2024-01-01T00:02:00Z',
      consensus: 'Single Source',
      status: 'Verified'
    }
  ];

  if (!mounted) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full mb-4">
            <MessageSquare className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-medium">Hedera Consensus Service</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Immutable Message Logging</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Every Oracle query and system event is logged to Hedera Consensus Service for tamper-proof audit trails and real-time consensus.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <Clock className="w-8 h-8 text-green-400 mb-3" />
                <h3 className="font-semibold mb-2">Sub-3s Finality</h3>
                <p className="text-gray-400 text-sm">Messages reach consensus in under 3 seconds</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <Shield className="w-8 h-8 text-blue-400 mb-3" />
                <h3 className="font-semibold mb-2">Tamper Proof</h3>
                <p className="text-gray-400 text-sm">Cryptographically secured message integrity</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <Zap className="w-8 h-8 text-yellow-400 mb-3" />
                <h3 className="font-semibold mb-2">High Throughput</h3>
                <p className="text-gray-400 text-sm">10,000+ transactions per second capacity</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <MessageSquare className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="font-semibold mb-2">4 Audit Topics</h3>
                <p className="text-gray-400 text-sm">Oracle, Compute, Account & System topics</p>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Topic Configuration</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Oracle Topic</span>
                  <span className="text-green-400">0.0.12345</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Compute Topic</span>
                  <span className="text-green-400">0.0.12346</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Account Topic</span>
                  <span className="text-green-400">0.0.12347</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">System Metrics</span>
                  <span className="text-green-400">0.0.12348</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <div className="bg-gray-700 px-6 py-3 border-b border-gray-600">
              <h3 className="font-semibold">Recent HCS Messages</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      activeMessage === index
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => setActiveMessage(index)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-blue-400">{message.type}</span>
                      <span className="text-xs text-green-400">{message.status}</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{message.content}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>ID: {message.id.split('@')[0]}</span>
                      <span>{message.consensus}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}