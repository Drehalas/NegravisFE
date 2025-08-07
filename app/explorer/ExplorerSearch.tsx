'use client';

import { useState } from 'react';

export default function ExplorerSearch() {
  const [searchType, setSearchType] = useState('account');
  const [searchValue, setSearchValue] = useState('');

  const searchTypes = [
    { id: 'account', label: 'Account ID', placeholder: '0.0.123456', icon: 'ri-user-line' },
    { id: 'transaction', label: 'Transaction ID', placeholder: '0.0.123456-1234567890-123456789', icon: 'ri-exchange-line' },
    { id: 'topic', label: 'Topic ID', placeholder: '0.0.123456', icon: 'ri-message-3-line' },
    { id: 'contract', label: 'Contract ID', placeholder: '0.0.123456', icon: 'ri-file-code-line' },
    { id: 'token', label: 'Token ID', placeholder: '0.0.123456', icon: 'ri-coins-line' },
    { id: 'file', label: 'File ID', placeholder: '0.0.123456', icon: 'ri-file-line' }
  ];

  const recentSearches = [
    { type: 'account', value: '0.0.987654', label: 'Oracle Provider Account' },
    { type: 'transaction', value: '0.0.555666-1699123456-789', label: 'Recent Consensus Transaction' },
    { type: 'topic', value: '0.0.12345678', label: 'Oracle Audit Topic' },
    { type: 'contract', value: '0.0.444555', label: 'PriceFeed Contract' }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 mb-8">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">HashScan Explorer Search</h2>
        <p className="text-gray-600 text-sm mt-1">Search accounts, transactions, topics, contracts, tokens, and files</p>
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {searchTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSearchType(type.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                searchType === type.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <i className={type.icon}></i>
              <span>{type.label}</span>
            </button>
          ))}
        </div>
        
        <div className="relative mb-6">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={searchTypes.find(t => t.id === searchType)?.placeholder}
            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <i className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl ${
            searchTypes.find(t => t.id === searchType)?.icon
          }`}></i>
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium cursor-pointer whitespace-nowrap">
            <i className="ri-search-line mr-2"></i>
            Search
          </button>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Recent Searches</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchType(search.type);
                  setSearchValue(search.value);
                }}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer text-left"
              >
                <div className="flex items-center space-x-3">
                  <i className={`${searchTypes.find(t => t.id === search.type)?.icon} text-gray-400`}></i>
                  <div>
                    <div className="font-medium text-gray-900">{search.label}</div>
                    <div className="text-sm text-gray-500 font-mono">{search.value}</div>
                  </div>
                </div>
                <i className="ri-external-link-line text-gray-400"></i>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}