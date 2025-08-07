'use client';

import Header from '@/components/Header';
import HCSTopics from './HCSTopics';
import MessageActivity from './MessageActivity';
import TopicAnalytics from './TopicAnalytics';

export default function Consensus() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">HCS Topics</h1>
          <p className="text-gray-600 mt-2">Manage your 4 custom Hedera Consensus Service audit topics</p>
        </div>
        
        <HCSTopics />
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <MessageActivity />
          <TopicAnalytics />
        </div>
      </div>
    </div>
  );
}