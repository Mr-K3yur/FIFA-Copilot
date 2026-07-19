import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '14:00', ingress: 4000, egress: 200 },
  { time: '14:30', ingress: 12000, egress: 300 },
  { time: '15:00', ingress: 25000, egress: 400 },
  { time: '15:30', ingress: 45000, egress: 800 },
  { time: '16:00', ingress: 68000, egress: 1200 },
  { time: '16:30', ingress: 80000, egress: 1500 }, // Peak / Kickoff
  { time: '17:00', ingress: 82000, egress: 2000 },
];

export const ChartsPanel: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-md h-full flex flex-col"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Live Fan Ingress Trend</h3>
        <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-medium border border-emerald-500/30">
          Live
        </span>
      </div>
      
      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIngress" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val / 1000}k`} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Area type="monotone" dataKey="ingress" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorIngress)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
