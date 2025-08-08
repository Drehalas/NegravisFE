'use client';

import React from 'react';

export default function StatsSection() {
  const stats = [
    {
      icon: 'ri-code-line',
      number: '15,000+',
      label: 'Lines of Code',
      description: 'Production-ready codebase'
    },
    {
      icon: 'ri-service-line',
      number: '11',
      label: 'Full Services',
      description: 'Comprehensive infrastructure'
    },
    {
      icon: 'ri-api-line',
      number: '75+',
      label: 'API Endpoints',
      description: 'Complete REST API coverage'
    },
    {
      icon: 'ri-database-line',
      number: '9',
      label: 'Oracle Providers',
      description: 'Diversified data sources'
    },
    {
      icon: 'ri-chat-3-line',
      number: '4',
      label: 'HCS Topics',
      description: 'Dedicated consensus topics'
    },
    {
      icon: 'ri-time-line',
      number: '5s',
      label: 'Message Timeout',
      description: 'Real-time processing'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Platform Statistics
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Built for scale with production-grade architecture and comprehensive monitoring
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`${stat.icon} text-white text-2xl`}></i>
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-xl font-semibold text-white mb-1">{stat.label}</div>
              <div className="text-blue-100">{stat.description}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Scalable</h3>
              <p className="text-blue-100">Designed for enterprise-level load and growth</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Secure</h3>
              <p className="text-blue-100">Military-grade encryption and audit trails</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Real-time</h3>
              <p className="text-blue-100">Sub-second consensus and data processing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}