/**
 * Data Source Status Component
 * Shows connection status and allows switching between data sources
 */

'use client';

import React, { useState, useEffect } from 'react';
import { dataService } from '@/data/Data';
import { useNegravisFrontendConnection } from '@/hooks/useNegravisFrontend';
import { Globe, Server, Database, Wifi, WifiOff, CheckCircle, AlertCircle, Settings } from 'lucide-react';

export default function DataSourceStatus() {
  const [currentSource, setCurrentSource] = useState<string>('negravis-frontend');
  const [isExpanded, setIsExpanded] = useState(false);
  const { isConnected: negravisConnected, lastChecked } = useNegravisFrontendConnection();

  useEffect(() => {
    setCurrentSource(dataService.getDataSource());
  }, []);

  const handleSourceChange = (source: 'negravis-frontend' | 'zerog-backend' | 'mock') => {
    dataService.setDataSource(source);
    setCurrentSource(source);
    window.location.reload(); // Refresh to apply new data source
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'negravis-frontend':
        return <Globe className="h-4 w-4" />;
      case 'zerog-backend':
        return <Server className="h-4 w-4" />;
      case 'mock':
        return <Database className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  const getSourceName = (source: string) => {
    switch (source) {
      case 'negravis-frontend':
        return 'Negravis Frontend';
      case 'zerog-backend':
        return '0G Backend';
      case 'mock':
        return 'Mock Data';
      default:
        return 'Unknown';
    }
  };

  const getConnectionStatus = () => {
    if (currentSource === 'negravis-frontend') {
      return {
        connected: negravisConnected,
        icon: negravisConnected ? <CheckCircle className="h-4 w-4 text-green-400" /> : <AlertCircle className="h-4 w-4 text-red-400" />,
        status: negravisConnected ? 'Connected' : 'Disconnected',
        url: 'https://negravis-frontend.vercel.app'
      };
    } else if (currentSource === 'zerog-backend') {
      return {
        connected: null, // We don't actively check 0G backend connection
        icon: <Server className="h-4 w-4 text-blue-400" />,
        status: 'Configured',
        url: 'localhost:4000'
      };
    } else {
      return {
        connected: true,
        icon: <CheckCircle className="h-4 w-4 text-green-400" />,
        status: 'Available',
        url: 'Local Mock Data'
      };
    }
  };

  const connectionInfo = getConnectionStatus();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Compact Status Indicator */}
      <div 
        className={`bg-gray-900/90 backdrop-blur-lg rounded-lg border border-purple-500/20 transition-all duration-300 ${
          isExpanded ? 'w-80 p-4' : 'w-12 h-12 p-2 cursor-pointer hover:bg-gray-800/90'
        }`}
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        {!isExpanded ? (
          // Minimized view
          <div className="flex items-center justify-center h-full">
            <div className="relative">
              {getSourceIcon(currentSource)}
              <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                connectionInfo.connected ? 'bg-green-400' : 'bg-red-400'
              }`} />
            </div>
          </div>
        ) : (
          // Expanded view
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Settings className="h-4 w-4 text-purple-400" />
                <span className="text-white font-medium">Data Source</span>
              </div>
              <button 
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>

            {/* Current Source Status */}
            <div className="bg-gray-800/50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getSourceIcon(currentSource)}
                  <span className="text-white text-sm font-medium">
                    {getSourceName(currentSource)}
                  </span>
                </div>
                {connectionInfo.icon}
              </div>
              <div className="text-xs text-gray-400">
                {connectionInfo.status} • {connectionInfo.url}
              </div>
              {lastChecked && (
                <div className="text-xs text-gray-500 mt-1">
                  Last checked: {lastChecked.toLocaleTimeString()}
                </div>
              )}
            </div>

            {/* Source Options */}
            <div className="space-y-2">
              <div className="text-xs text-gray-400 mb-2">Switch Data Source:</div>
              
              {/* Negravis Frontend */}
              <button
                onClick={() => handleSourceChange('negravis-frontend')}
                className={`w-full flex items-center justify-between p-2 rounded text-sm transition-colors ${
                  currentSource === 'negravis-frontend'
                    ? 'bg-purple-600/20 border border-purple-500/30 text-purple-300'
                    : 'bg-gray-800/30 hover:bg-gray-700/30 text-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Globe className="h-3 w-3" />
                  <span>Negravis Frontend</span>
                </div>
                <div className="flex items-center space-x-1">
                  {negravisConnected ? (
                    <Wifi className="h-3 w-3 text-green-400" />
                  ) : (
                    <WifiOff className="h-3 w-3 text-red-400" />
                  )}
                  <span className="text-xs">Live</span>
                </div>
              </button>

              {/* 0G Backend */}
              <button
                onClick={() => handleSourceChange('zerog-backend')}
                className={`w-full flex items-center justify-between p-2 rounded text-sm transition-colors ${
                  currentSource === 'zerog-backend'
                    ? 'bg-purple-600/20 border border-purple-500/30 text-purple-300'
                    : 'bg-gray-800/30 hover:bg-gray-700/30 text-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Server className="h-3 w-3" />
                  <span>0G Backend</span>
                </div>
                <span className="text-xs">Local</span>
              </button>

              {/* Mock Data */}
              <button
                onClick={() => handleSourceChange('mock')}
                className={`w-full flex items-center justify-between p-2 rounded text-sm transition-colors ${
                  currentSource === 'mock'
                    ? 'bg-purple-600/20 border border-purple-500/30 text-purple-300'
                    : 'bg-gray-800/30 hover:bg-gray-700/30 text-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Database className="h-3 w-3" />
                  <span>Mock Data</span>
                </div>
                <span className="text-xs">Demo</span>
              </button>
            </div>

            {/* Integration Info */}
            {currentSource === 'negravis-frontend' && (
              <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-3">
                <div className="text-xs text-blue-300 font-medium mb-1">
                  🔗 Connected to Deployed Frontend
                </div>
                <div className="text-xs text-blue-400">
                  Real Oracle queries, live provider data, and transaction history from negravis-frontend.vercel.app
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}