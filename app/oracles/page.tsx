'use client';

import Header from '@/components/Header';
import OracleAssistant from '@/components/OracleAssistant';
import OracleProviders from './OracleProviders';
import DataFeeds from './DataFeeds';
import ConsensusAlgorithms from './ConsensusAlgorithms';

export default function Oracles() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Oracle Network</h1>
          <p className="text-gray-600 mt-2">Interactive Oracle queries with real-time data from 9+ providers and advanced consensus algorithms</p>
        </div>
        
        <div className="mb-8">
          <OracleAssistant />
        </div>
        
        <OracleProviders />
        <DataFeeds />
        <ConsensusAlgorithms />
      </div>
    </div>
  );
}