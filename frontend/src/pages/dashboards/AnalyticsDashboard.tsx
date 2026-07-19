import React from 'react';

import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, Download } from 'lucide-react';
import { HourlyVisitorsChart } from '../../components/analytics/HourlyVisitorsChart';
import { CrowdPredictionChart } from '../../components/analytics/CrowdPredictionChart';
import { VolunteerWorkloadChart } from '../../components/analytics/VolunteerWorkloadChart';
import { FoodDemandChart } from '../../components/analytics/FoodDemandChart';
import { ParkingUtilizationChart } from '../../components/analytics/ParkingUtilizationChart';

export const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500/30 pb-12">
      
      {/* Header */}
      <header className="bg-slate-900 border-b border-white/10 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link to="/organizer" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2 text-indigo-400">
            <BarChart3 className="w-6 h-6" />
            <span className="text-xl font-bold tracking-tight text-white">Global Analytics</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <main className="p-4 md:p-6 max-w-[1600px] mx-auto flex flex-col gap-6">
        
        {/* Top Row: Large Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-[400px]">
          <HourlyVisitorsChart />
          <CrowdPredictionChart />
        </div>

        {/* Bottom Row: Specialized Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-auto lg:h-[350px]">
          <VolunteerWorkloadChart />
          <FoodDemandChart />
          <ParkingUtilizationChart />
        </div>

      </main>
    </div>
  );
};

export default AnalyticsDashboard;
