'use client';

import { Shield, TrendingUp, Zap, Database, Clock, Globe } from 'lucide-react';

export default function UseCasesPage() {
  const useCases = [
    {
      id: 'defi-oracles',
      title: 'DeFi Price Oracles',
      description: 'Real-time cryptocurrency price feeds for decentralized finance protocols',
      icon: <TrendingUp className="h-8 w-8" />,
      gradient: 'from-green-500 to-emerald-600',
      benefits: [
        'Sub-second price updates',
        'Multi-source aggregation',
        'MEV protection',
        'High availability guarantees'
      ],
      example: {
        scenario: 'DEX Trading Platform',
        description: 'A decentralized exchange uses Negravis Oracle to get real-time BTC/ETH prices from multiple sources, ensuring fair trading and preventing arbitrage exploitation.',
        metrics: ['99.99% uptime', '< 100ms latency', '12+ price sources']
      }
    },
    {
      id: 'smart-contracts',
      title: 'Smart Contract Automation',
      description: 'Trigger smart contract executions based on real-world data and events',
      icon: <Zap className="h-8 w-8" />,
      gradient: 'from-blue-500 to-cyan-600',
      benefits: [
        'Automated execution',
        'Verifiable data sources',
        'Gas-optimized calls',
        'Event-driven triggers'
      ],
      example: {
        scenario: 'Insurance Claims Processing',
        description: 'Weather-based crop insurance automatically pays out farmers when temperature or rainfall data from verified sources meets claim conditions.',
        metrics: ['24/7 monitoring', 'Instant payouts', '100% transparency']
      }
    },
    {
      id: 'enterprise-apis',
      title: 'Enterprise Data Integration',
      description: 'Secure, scalable API access to blockchain-verified data for enterprise systems',
      icon: <Database className="h-8 w-8" />,
      gradient: 'from-purple-500 to-indigo-600',
      benefits: [
        'Enterprise-grade SLA',
        'Custom data feeds',
        'Compliance ready',
        'Audit trails'
      ],
      example: {
        scenario: 'Supply Chain Tracking',
        description: 'Manufacturing companies track product authenticity and provenance using blockchain-verified data from IoT sensors throughout the supply chain.',
        metrics: ['End-to-end tracking', 'Tamper-proof logs', 'Regulatory compliance']
      }
    },
    {
      id: 'real-time-analytics',
      title: 'Real-Time Analytics',
      description: 'Live dashboards and monitoring systems powered by blockchain data streams',
      icon: <Clock className="h-8 w-8" />,
      gradient: 'from-orange-500 to-red-600',
      benefits: [
        'Live data streaming',
        'Historical analysis',
        'Predictive insights',
        'Custom alerts'
      ],
      example: {
        scenario: 'Trading Risk Management',
        description: 'Hedge funds monitor portfolio risk in real-time using live market data, automatically rebalancing positions when risk thresholds are exceeded.',
        metrics: ['Real-time alerts', 'Risk scoring', 'Auto-rebalancing']
      }
    },
    {
      id: 'consensus-verification',
      title: 'Consensus & Verification',
      description: 'Multi-party data verification and consensus mechanisms for critical decisions',
      icon: <Shield className="h-8 w-8" />,
      gradient: 'from-teal-500 to-green-600',
      benefits: [
        'Multi-source validation',
        'Consensus algorithms',
        'Fraud detection',
        'Immutable records'
      ],
      example: {
        scenario: 'Election Monitoring',
        description: 'Electoral data from multiple independent sources is verified through consensus algorithms, ensuring transparent and tamper-proof vote counting.',
        metrics: ['Multi-party verification', 'Real-time results', 'Audit trail']
      }
    },
    {
      id: 'global-infrastructure',
      title: 'Global Infrastructure Monitoring',
      description: 'Monitor and analyze global infrastructure using distributed sensor networks',
      icon: <Globe className="h-8 w-8" />,
      gradient: 'from-slate-500 to-gray-600',
      benefits: [
        'Global coverage',
        'IoT integration',
        'Predictive maintenance',
        'Emergency response'
      ],
      example: {
        scenario: 'Smart City Management',
        description: 'Cities monitor air quality, traffic flow, and energy consumption using distributed sensors, optimizing resource allocation and improving quality of life.',
        metrics: ['1000+ sensors', 'City-wide coverage', 'Real-time optimization']
      }
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header with 3D Elements */}
      <div className="relative bg-gradient-to-r from-black via-purple-900 to-black text-white overflow-hidden">
        {/* 3D Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-16 left-20 w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg rotate-45 animate-spin-slow"></div>
          <div className="absolute top-32 right-32 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-16 w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg rotate-12 animate-bounce"></div>
          <div className="absolute bottom-32 right-20 w-32 h-32 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Real-World Use Cases
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Discover how Negravis Oracle Platform is transforming industries with reliable, 
              real-time blockchain data solutions. From DeFi to enterprise applications, 
              see the power of decentralized data in action.
            </p>
          </div>
        </div>
      </div>

      {/* Use Cases Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-8">
          {useCases.map((useCase, index) => (
            <div key={useCase.id} className="bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl border border-purple-500/20 overflow-hidden hover:shadow-2xl hover:border-purple-400/40 transition-all duration-300">
              <div className="p-8">
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-r ${useCase.gradient} flex items-center justify-center text-white shadow-lg`}>
                    {useCase.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-white mb-3">{useCase.title}</h2>
                      <p className="text-gray-300 text-lg leading-relaxed">{useCase.description}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Benefits */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Key Benefits</h3>
                        <ul className="space-y-2">
                          {useCase.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center text-gray-300">
                              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mr-3"></div>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Example */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Real-World Example</h3>
                        <div className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/20">
                          <h4 className="font-medium text-white mb-2">{useCase.example.scenario}</h4>
                          <p className="text-gray-300 text-sm mb-3">{useCase.example.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {useCase.example.metrics.map((metric, i) => (
                              <span key={i} className="inline-block bg-purple-600/20 text-purple-300 text-xs font-medium px-2 py-1 rounded border border-purple-500/30">
                                {metric}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-600 to-black text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Build Your Solution?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join the next generation of applications powered by reliable, decentralized data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/api-docs" 
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Explore API Documentation
            </a>
            <a 
              href="/dashboard" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              Try Live Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}