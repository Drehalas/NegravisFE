'use client';

export default function SecuritySection() {
  const securityFeatures = [
    {
      icon: 'ri-shield-check-line',
      title: 'Role-Based Access Control',
      description: 'Granular permissions and access management for enterprise security'
    },
    {
      icon: 'ri-lock-line',
      title: 'AES-256 Encryption',
      description: 'Military-grade encryption for all data storage and transmission'
    },
    {
      icon: 'ri-key-line',
      title: 'Digital Signatures',
      description: 'Cryptographic signatures for transaction authenticity and integrity'
    },
    {
      icon: 'ri-bug-line',
      title: 'Input Validation',
      description: 'Comprehensive validation to prevent injection attacks and data corruption'
    },
    {
      icon: 'ri-audit-line',
      title: 'HCS Audit Trails',
      description: 'Immutable audit logs stored on Hedera Consensus Service'
    },
    {
      icon: 'ri-radar-line',
      title: 'Real-time Monitoring',
      description: 'Continuous health checks and anomaly detection for network security'
    }
  ];

  const consensusAlgorithms = [
    { name: 'Median Consensus', description: 'Statistical median calculation for price stability' },
    { name: 'Weighted Average', description: 'Provider-weighted calculations based on reliability' },
    { name: 'Majority Vote', description: 'Democratic consensus for binary decisions' },
    { name: 'Confidence Weighted', description: 'Quality-based weighting for optimal accuracy' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Enterprise-Grade Security
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Built with multiple layers of security and compliance features for production environments
            </p>
            
            <div className="grid gap-6">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <i className={`${feature.icon} text-blue-600 text-lg`}></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Oracle Consensus Algorithms
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Advanced consensus mechanisms with outlier filtering and quality assurance
            </p>
            
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="space-y-6">
                {consensusAlgorithms.map((algorithm, index) => (
                  <div key={index} className="border-l-4 border-blue-600 pl-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{algorithm.name}</h3>
                    <p className="text-gray-600 text-sm">{algorithm.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Outlier Filtering</h4>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    3-Sigma Detection
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    30% Deviation Filter
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Quality Weighting
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}