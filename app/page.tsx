
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
      

    </div>
  );
}
