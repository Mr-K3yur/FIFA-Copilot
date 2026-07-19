import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { AIBenefitsSection } from '../components/home/AIBenefitsSection';
import { ArchitectureSection } from '../components/home/ArchitectureSection';
import { StatisticsSection } from '../components/home/StatisticsSection';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-emerald-500/30">
      <Navbar />
      
      <main>
        <HeroSection />
        <StatisticsSection />
        <FeaturesSection />
        <AIBenefitsSection />
        <ArchitectureSection />
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
