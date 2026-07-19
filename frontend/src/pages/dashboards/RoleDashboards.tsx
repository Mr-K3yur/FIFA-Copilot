import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navbar } from '../../components/layout/Navbar';
import { LogOut } from 'lucide-react';

const BaseDashboard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Simple dashboard header */}
      <header className="border-b border-white/10 bg-slate-900/50 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            FIFA Copilot
          </span>
          <span className="text-slate-500">|</span>
          <span className="font-medium text-slate-300">{title}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400">Logged in as <strong className="text-white">{user?.name}</strong></span>
          <button 
            onClick={logout}
            className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
};



export const VolunteerDashboard: React.FC = () => (
  <BaseDashboard title="Volunteer Portal">
    <div className="p-8 border border-white/10 rounded-2xl bg-slate-900/30">
      <h1 className="text-3xl font-bold mb-4">Welcome Volunteer!</h1>
      <p className="text-slate-400">Your specific sector assignments, live AI alerts, and crowd assistance tasks will appear here.</p>
    </div>
  </BaseDashboard>
);

export const SecurityDashboard: React.FC = () => (
  <BaseDashboard title="Security Operations">
    <div className="p-8 border border-white/10 rounded-2xl bg-slate-900/30">
      <h1 className="text-3xl font-bold mb-4">Welcome Security!</h1>
      <p className="text-slate-400">Live CCTV integrations, incident prediction maps, and emergency protocols will appear here.</p>
    </div>
  </BaseDashboard>
);
