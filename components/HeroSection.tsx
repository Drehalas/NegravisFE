'use client';

export default function HeroSection() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=Advanced%20blockchain%20technology%20network%20with%20glowing%20nodes%20and%20data%20streams%2C%20futuristic%20digital%20infrastructure%20with%20Hedera%20hashgraph%20visualization%2C%20dark%20blue%20gradient%20background%20with%20luminous%20connections%2C%20high-tech%20oracle%20systems%20and%20consensus%20mechanisms%2C%20professional%20corporate%20technology%20aesthetic%20with%20geometric%20patterns%20and%20data%20visualization%20elements&width=1920&height=1080&seq=negravis-hero&orientation=landscape')`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/80"></div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="text-left max-w-3xl">
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            Hedera Consensus
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Oracle Network
            </span>
          </h1>
          
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            Advanced oracle platform leveraging Hedera Consensus Service with multiple data sources, 
            real-time analytics, and production-grade security. Built for enterprise-scale applications 
            with 75+ API endpoints and 9 oracle providers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg whitespace-nowrap cursor-pointer">
              Launch Dashboard
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg whitespace-nowrap cursor-pointer">
              View Documentation
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">15,000+</div>
              <div className="text-gray-300">Lines of Code</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">9</div>
              <div className="text-gray-300">Oracle Providers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">75+</div>
              <div className="text-gray-300">API Endpoints</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}