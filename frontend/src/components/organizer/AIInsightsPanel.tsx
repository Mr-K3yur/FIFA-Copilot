import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, AlertTriangle, ArrowRight, Zap } from 'lucide-react';

export const AIInsightsPanel: React.FC = () => {
  const [insights, setInsights] = useState([
    { id: 1, type: 'critical', text: 'Sector E1 is at 92% capacity. Open Gate E-Overflow immediately to relieve pressure.', time: 'Just now' },
    { id: 2, type: 'warning', text: 'Concession Wait Times in North 2 exceeding 15 mins. Dispatching mobile vendors.', time: '2 mins ago' },
    { id: 3, type: 'info', text: 'Weather radar indicates light rain in 45 mins. Roof closure recommended.', time: '12 mins ago' },
  ]);

  // Simulate incoming AI insight
  useEffect(() => {
    const timer = setTimeout(() => {
      setInsights(prev => [
        { id: Date.now(), type: 'info', text: 'Predicted 12,000 fan influx at Transit Station C in 10 minutes. Coordinating with transit authority.', time: 'Just now' },
        ...prev
      ]);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  const getTypeStyles = (type: string) => {
    switch(type) {
      case 'critical': return 'bg-red-500/10 border-red-500/30 text-red-400';
      case 'warning': return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      case 'info': return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      default: return 'bg-slate-800 border-white/10 text-white';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-md h-full flex flex-col relative overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-[50px] pointer-events-none" />
      
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">Gemini Live Insights</h3>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        <AnimatePresence>
          {insights.map((insight) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
              exit={{ opacity: 0, height: 0 }}
              className={`p-4 rounded-xl border ${getTypeStyles(insight.type)} flex gap-3 items-start relative overflow-hidden group`}
            >
              <div className="mt-1 flex-shrink-0">
                {insight.type === 'critical' ? <AlertTriangle className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-200 mb-1 leading-snug group-hover:text-white transition-colors">{insight.text}</p>
                <span className="text-xs opacity-70">{insight.time}</span>
              </div>
              <button className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/10 rounded-full">
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10 text-center">
        <button className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
          View All AI Logs →
        </button>
      </div>
    </motion.div>
  );
};
