import React from 'react';
import { motion } from 'framer-motion';

const sectors = [
  { id: 'N1', density: 45, label: 'North 1' },
  { id: 'N2', density: 88, label: 'North 2' },
  { id: 'E1', density: 92, label: 'East 1' },
  { id: 'E2', density: 60, label: 'East 2' },
  { id: 'S1', density: 30, label: 'South 1' },
  { id: 'S2', density: 40, label: 'South 2' },
  { id: 'W1', density: 75, label: 'West 1' },
  { id: 'W2', density: 82, label: 'West 2' },
  { id: 'C', density: 95, label: 'Center / VIP' },
];

const getDensityColor = (density: number) => {
  if (density >= 90) return 'bg-red-500/80 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]';
  if (density >= 75) return 'bg-amber-500/80 border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.2)]';
  return 'bg-emerald-500/60 border-emerald-500';
};

export const HeatmapPanel: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-md h-full flex flex-col"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Live Crowd Heatmap</h3>
        <div className="flex gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Low</div>
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Med</div>
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> High</div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center relative min-h-[250px]">
        {/* Mock Stadium Shape (Oval) */}
        <div className="w-full max-w-sm aspect-[4/3] rounded-[40%] border-4 border-slate-700/50 p-4 relative grid grid-cols-3 grid-rows-3 gap-2 bg-slate-950/50">
          {sectors.map((sector) => (
            <div 
              key={sector.id} 
              className={`rounded-xl border flex flex-col items-center justify-center transition-all ${getDensityColor(sector.density)}`}
              title={`${sector.label}: ${sector.density}% Full`}
            >
              <span className="text-white font-bold text-sm md:text-base">{sector.id}</span>
              <span className="text-white/80 text-[10px] md:text-xs">{sector.density}%</span>
            </div>
          ))}
          {/* Pitch outline in the middle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/2 border-2 border-white/20 rounded-md pointer-events-none" />
        </div>
      </div>
    </motion.div>
  );
};
