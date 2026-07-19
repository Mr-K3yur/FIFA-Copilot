import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Globe, Accessibility, ChevronDown } from 'lucide-react';
import { QuickNavigationCards } from '../../components/fan/QuickNavigationCards';
import { InteractiveMap } from '../../components/fan/InteractiveMap';
import { AIChatWidget } from '../../components/fan/AIChatWidget';
import { EmergencyButton } from '../../components/fan/EmergencyButton';

export const FanDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [highContrast, setHighContrast] = useState(false);
  const [lang, setLang] = useState('EN');

  return (
    <div className={`min-h-screen transition-colors duration-300 ${highContrast ? 'bg-black text-yellow-400' : 'bg-slate-950 text-white'}`}>
      
      {/* Header */}
      <header className={`border-b sticky top-0 z-50 backdrop-blur-md px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 ${highContrast ? 'border-yellow-400/50 bg-black/90' : 'border-white/10 bg-slate-900/50'}`}>
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2">
            <span className={`text-xl font-bold ${highContrast ? 'text-yellow-400' : 'bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400'}`}>
              Fan Hub
            </span>
          </div>
          
          {/* Mobile Top Controls */}
          <div className="flex items-center gap-3 md:hidden">
            <button onClick={() => setHighContrast(!highContrast)} className="p-2 bg-white/5 rounded-full">
              <Accessibility className="w-5 h-5" />
            </button>
            <button onClick={logout} className="p-2 bg-white/5 rounded-full text-red-400">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-6">
          {/* Language Selector */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">{lang}</span>
            <ChevronDown className="w-3 h-3" />
          </div>

          {/* Accessibility Toggle */}
          <button 
            onClick={() => setHighContrast(!highContrast)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors ${highContrast ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
          >
            <Accessibility className="w-4 h-4" />
            <span className="text-sm font-medium">Access Mode</span>
          </button>

          <div className="w-px h-6 bg-white/10 mx-2" />

          <span className="text-sm">Hi, <strong className={highContrast ? 'text-yellow-400' : 'text-emerald-400'}>{user?.name}</strong></span>
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 md:p-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        
        {/* Left Column (Routing & Cards) */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          {/* Welcome Banner */}
          <div className={`p-6 rounded-3xl border ${highContrast ? 'border-yellow-400/50 bg-yellow-900/20' : 'border-white/10 bg-gradient-to-r from-blue-900/40 to-slate-900'}`}>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome to MetLife Stadium!</h1>
            <p className={`${highContrast ? 'text-yellow-200' : 'text-slate-300'}`}>Match: USA vs England • Kickoff in 2h 15m</p>
          </div>

          {/* Interactive Map */}
          <InteractiveMap />
        </div>

        {/* Right Column (Quick Actions & Emergency) */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <h2 className="text-lg font-semibold px-2">Quick Navigation</h2>
          <QuickNavigationCards />

          <div className="mt-4 flex-1">
            <EmergencyButton />
          </div>
        </div>

      </main>

      {/* Floating AI Chat */}
      <AIChatWidget />
    </div>
  );
};

export default FanDashboard;
