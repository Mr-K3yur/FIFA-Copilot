import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { time: '12:00', visitors: 2000, previous: 1500 },
  { time: '13:00', visitors: 15000, previous: 12000 },
  { time: '14:00', visitors: 45000, previous: 40000 },
  { time: '15:00', visitors: 78000, previous: 75000 },
  { time: '16:00', visitors: 82000, previous: 80000 }, // Match Start
  { time: '17:00', visitors: 82000, previous: 81000 },
  { time: '18:00', visitors: 65000, previous: 68000 }, // Egress begins
  { time: '19:00', visitors: 25000, previous: 30000 },
  { time: '20:00', visitors: 5000, previous: 8000 },
];

export const HourlyVisitorsChart: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-md h-full flex flex-col"
    >
      <h3 className="text-lg font-semibold text-white mb-4">Hourly Visitors (Ingress/Egress)</h3>
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val / 1000}k`} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Area type="monotone" dataKey="previous" stroke="#94a3b8" strokeWidth={2} fillOpacity={1} fill="url(#colorPrevious)" name="Previous Match" />
            <Area type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" name="Current Match" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
