
'use client';

import dynamic from 'next/dynamic';
import ServicesGrid from '@/components/ServicesGrid';
import SecuritySection from '@/components/SecuritySection';
import StatsSection from '@/components/StatsSection';
import Features from '@/components/Features';
import HCSShowcase from '@/components/hedera/HCSShowcase';
import SmartContractShowcase from '@/components/hedera/SmartContractShowcase';
import HFSShowcase from '@/components/hedera/HFSShowcase';
import HashScanShowcase from '@/components/hedera/HashScanShowcase';

// Dynamically import 3D components to avoid SSR issues
const LandingPage3D = dynamic(() => import('@/components/LandingPage3D'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="min-h-screen">
      <LandingPage3D />
      <ServicesGrid />
      <HCSShowcase />
      <SmartContractShowcase />
      <HFSShowcase />
      <HashScanShowcase />
      <Features />
      <SecuritySection />
      <StatsSection />
      
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <i className="ri-database-2-line text-white text-xl"></i>
                </div>
                <h3 className="font-['Pacifico'] text-2xl">Negravis</h3>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Advanced Hedera Consensus Oracle platform with 3D visualization, 
                real-time analytics, and enterprise-grade security.
              </p>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer">
                  <i className="ri-github-line text-gray-400"></i>
                </button>
                <button className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer">
                  <i className="ri-twitter-line text-gray-400"></i>
                </button>
                <button className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer">
                  <i className="ri-discord-line text-gray-400"></i>
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6">Platform</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="/dashboard" className="hover:text-white cursor-pointer">Dashboard</a></li>
                <li><a href="/oracles" className="hover:text-white cursor-pointer">Oracle Network</a></li>
                <li><a href="/consensus" className="hover:text-white cursor-pointer">HCS Topics</a></li>
                <li><a href="/analytics" className="hover:text-white cursor-pointer">Analytics</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6">Resources</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="/docs" className="hover:text-white cursor-pointer">Documentation</a></li>
                <li><a href="/api" className="hover:text-white cursor-pointer">API Reference</a></li>
                <li><a href="/support" className="hover:text-white cursor-pointer">Support</a></li>
                <li><a href="/status" className="hover:text-white cursor-pointer">Status Page</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Negravis. All rights reserved. Built on Hedera Hashgraph with 3D visualization.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
