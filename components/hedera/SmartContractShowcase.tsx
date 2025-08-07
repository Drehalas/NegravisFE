'use client';

import { useState } from 'react';
import { Code2, Play, CheckCircle, AlertCircle, FileCode, Zap } from 'lucide-react';

export default function SmartContractShowcase() {
  const [activeTab, setActiveTab] = useState('deployment');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState<string | null>(null);

  const executeContract = async () => {
    setIsExecuting(true);
    setExecutionResult(null);
    
    // Simulate contract execution
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setExecutionResult('Contract executed successfully! Price updated: $42,345.67');
    setIsExecuting(false);
  };

  const contractCode = `// PriceFeed Oracle Contract
pragma solidity ^0.8.0;

contract PriceFeed {
    struct Price {
        uint256 value;
        uint256 timestamp;
        bool isValid;
        address[] providers;
    }
    
    mapping(string => Price) public prices;
    mapping(address => bool) public authorizedOracles;
    
    event PriceUpdated(
        string symbol,
        uint256 price,
        uint256 timestamp,
        uint256 confidence
    );
    
    function updatePrice(
        string memory symbol,
        uint256 price,
        address[] memory providers
    ) external onlyAuthorizedOracle {
        require(price > 0, "Invalid price");
        
        prices[symbol] = Price({
            value: price,
            timestamp: block.timestamp,
            isValid: true,
            providers: providers
        });
        
        emit PriceUpdated(symbol, price, block.timestamp, 95);
    }
}`;

  const deploymentSteps = [
    { step: 1, title: 'Compile Contract', status: 'completed', time: '2.3s' },
    { step: 2, title: 'Deploy to Hedera', status: 'completed', time: '5.1s' },
    { step: 3, title: 'Verify Contract', status: 'completed', time: '1.8s' },
    { step: 4, title: 'Initialize Oracle', status: 'completed', time: '3.2s' }
  ];

  const contractMetrics = [
    { label: 'Gas Used', value: '2,847,392', change: '-12%' },
    { label: 'Execution Time', value: '1.2s', change: '+5%' },
    { label: 'Success Rate', value: '99.8%', change: '+0.2%' },
    { label: 'Active Oracles', value: '9', change: '0%' }
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full mb-4">
            <Code2 className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium">Smart Contracts</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Solidity Contract Integration</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Deploy and manage Oracle smart contracts on Hedera with full Solidity compatibility, 
            automatic compilation, and real-time monitoring.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 p-1 rounded-lg">
            {[
              { id: 'deployment', label: 'Deployment', icon: Zap },
              { id: 'code', label: 'Contract Code', icon: FileCode },
              { id: 'execution', label: 'Execution', icon: Play }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          {activeTab === 'deployment' && (
            <div className="p-8">
              <h3 className="text-xl font-semibold mb-6">Contract Deployment Pipeline</h3>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Deployment Steps */}
                <div>
                  <h4 className="text-lg font-medium mb-4">Deployment Steps</h4>
                  <div className="space-y-4">
                    {deploymentSteps.map((item) => (
                      <div key={item.step} className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg">
                        <div className="flex items-center justify-center w-8 h-8 bg-green-600 rounded-full">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-gray-400">Completed in {item.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contract Info */}
                <div>
                  <h4 className="text-lg font-medium mb-4">Contract Information</h4>
                  <div className="bg-gray-900 p-4 rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Contract ID:</span>
                      <span className="font-mono text-blue-400">0.0.4729583</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Network:</span>
                      <span>Hedera Testnet</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Compiler:</span>
                      <span>Solidity 0.8.19</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-green-400">Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Created:</span>
                      <span>2024-01-15 14:32:18</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h5 className="font-medium mb-3">Performance Metrics</h5>
                    <div className="grid grid-cols-2 gap-4">
                      {contractMetrics.map((metric, index) => (
                        <div key={index} className="bg-gray-900 p-3 rounded">
                          <div className="text-sm text-gray-400">{metric.label}</div>
                          <div className="font-semibold">{metric.value}</div>
                          <div className={`text-xs ${
                            metric.change.startsWith('+') ? 'text-green-400' : 
                            metric.change.startsWith('-') ? 'text-red-400' : 'text-gray-400'
                          }`}>
                            {metric.change}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="p-8">
              <h3 className="text-xl font-semibold mb-6">Oracle Smart Contract</h3>
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="bg-gray-700 px-4 py-2 border-b border-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="ml-4 text-sm text-gray-400">PriceFeed.sol</span>
                  </div>
                </div>
                <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
                  <code>{contractCode}</code>
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'execution' && (
            <div className="p-8">
              <h3 className="text-xl font-semibold mb-6">Contract Execution</h3>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-medium mb-4">Execute Function</h4>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">Function</label>
                      <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md">
                        <option>updatePrice</option>
                        <option>getPrice</option>
                        <option>authorizeOracle</option>
                      </select>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">Symbol</label>
                      <input 
                        type="text" 
                        placeholder="BTC"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">Price (USD)</label>
                      <input 
                        type="number" 
                        placeholder="42345.67"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md"
                      />
                    </div>
                    
                    <button
                      onClick={executeContract}
                      disabled={isExecuting}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
                    >
                      {isExecuting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Executing...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          Execute Contract
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-4">Execution Results</h4>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    {executionResult ? (
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                        <div>
                          <div className="text-green-400 font-medium">Success</div>
                          <div className="text-sm text-gray-300 mt-1">{executionResult}</div>
                          <div className="text-xs text-gray-500 mt-2">
                            Gas used: 47,392 | Time: 1.2s | Block: 12,847,392
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <div className="text-gray-400 font-medium">Ready to Execute</div>
                          <div className="text-sm text-gray-500 mt-1">
                            Enter parameters above and click execute to run the contract function.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <h5 className="font-medium mb-3">Recent Transactions</h5>
                    <div className="space-y-2">
                      {[
                        { hash: '0xa1b2c3...', function: 'updatePrice', status: 'Success', time: '2 min ago' },
                        { hash: '0xd4e5f6...', function: 'getPrice', status: 'Success', time: '5 min ago' },
                        { hash: '0x789abc...', function: 'updatePrice', status: 'Success', time: '8 min ago' }
                      ].map((tx, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-900 rounded">
                          <div>
                            <div className="font-mono text-sm text-blue-400">{tx.hash}</div>
                            <div className="text-xs text-gray-500">{tx.function}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-green-400">{tx.status}</div>
                            <div className="text-xs text-gray-500">{tx.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}