import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { LogOut, LayoutDashboard, Settings, Bell, Search, BarChart3 } from 'lucide-react';
import { StatCards } from '../../components/organizer/StatCards';
import { ChartsPanel } from '../../components/organizer/ChartsPanel';
import { HeatmapPanel } from '../../components/organizer/HeatmapPanel';
import { AIInsightsPanel } from '../../components/organizer/AIInsightsPanel';

export const OrganizerDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500/30">
      
      {/* Admin Topbar */}
      <header className="bg-slate-900 border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-emerald-400">
            <LayoutDashboard className="w-6 h-6" />
            <span className="text-xl font-bold tracking-tight text-white">Organizer Command</span>
          </div>
          
          <div className="hidden md:flex items-center bg-slate-950 border border-white/10 rounded-lg px-3 py-1.5 w-64">
            <Search className="w-4 h-4 text-slate-500 mr-2" />
            <input 
              type="text" 
              placeholder="Search sectors, staff..." 
              className="bg-transparent border-none text-sm text-white focus:outline-none w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/analytics" className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 rounded-lg transition-colors border border-indigo-500/30">
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm font-medium">Deep Analytics</span>
          </Link>

          <button className="relative p-2 text-slate-400 hover:text-white transition-colors bg-white/5 rounded-full">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </button>
          <button className="p-2 text-slate-400 hover:text-white transition-colors bg-white/5 rounded-full">
            <Settings className="w-4 h-4" />
          </button>
          <div className="w-px h-6 bg-white/10 mx-2" />
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-semibold">{user?.name}</span>
            <span className="text-xs text-emerald-400 font-medium">System Admin</span>
          </div>
          <button 
            onClick={logout}
            className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors ml-2"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Admin Dashboard Grid */}
      <main className="p-4 md:p-6 max-w-[1600px] mx-auto flex flex-col gap-6">
        
        {/* Top Row: KPIs */}
        <StatCards />

        {/* Middle Row: Visualizations & AI */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="h-[400px]">
              <ChartsPanel />
            </div>
            <div className="h-[350px]">
              <HeatmapPanel />
            </div>
          </div>
          <div className="lg:col-span-1 h-[774px]">
            <AIInsightsPanel />
          </div>
        </div>

      </main>
    </div>
  );
};

export default OrganizerDashboard;
