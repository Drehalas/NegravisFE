'use client';

export default function ServicesGrid() {
  const services = [
    {
      icon: 'ri-chat-check-line',
      title: 'Hedera Consensus Service',
      description: '4 custom audit topics with real-time & batch messaging, auto-topic creation, and message chunking',
      features: ['Oracle Topic', 'Compute Topic', 'Account Topic', 'System Metrics']
    },
    {
      icon: 'ri-mirror-line',
      title: 'Mirror Node Integration',
      description: 'HashScan integration with real-time analytics for comprehensive network monitoring',
      features: ['Account Tracking', 'Transaction Analysis', 'Topic Monitoring', 'Contract Events']
    },
    {
      icon: 'ri-file-shield-line',
      title: 'File Service (HFS)',
      description: 'AES-256 encrypted storage with GDPR & HIPAA compliance for secure data management',
      features: ['Digital ID Support', 'Access Audit Logs', 'Encrypted Storage', 'Compliance Ready']
    },
    {
      icon: 'ri-coins-line',
      title: 'Token Service (HTS)',
      description: 'Ready-to-activate token creation with HCS-based audit trails and oracle pricing',
      features: ['Token Creation', 'Audit Trails', 'Oracle Pricing', 'Smart Integration']
    },
    {
      icon: 'ri-code-box-line',
      title: 'Smart Contracts',
      description: 'Full Solidity compilation and deployment pipeline with oracle contract integration',
      features: ['Dynamic Providers', 'Quality Metrics', 'Price Updates', 'Multi-Oracle Support']
    },
    {
      icon: 'ri-user-settings-line',
      title: 'Account Service',
      description: 'Multi-account handling with balance checks, transaction signing, and comprehensive auditing',
      features: ['Multi-Account', 'Balance Checks', 'Transaction Signing', 'Audit Logging']
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Oracle Infrastructure
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built with 11 full services and production-grade architecture for scalable, secure, real-time operations
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-6">
                <i className={`${service.icon} text-white text-2xl`}></i>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}