import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { zone: 'North', medical: 12, security: 25, ushering: 40 },
  { zone: 'South', medical: 8, security: 15, ushering: 35 },
  { zone: 'East', medical: 20, security: 45, ushering: 60 },
  { zone: 'West', medical: 15, security: 30, ushering: 50 },
  { zone: 'VIP', medical: 2, security: 50, ushering: 20 },
];

export const VolunteerWorkloadChart: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-md h-full flex flex-col"
    >
      <h3 className="text-lg font-semibold text-white mb-4">Volunteer Deployment by Zone</h3>
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="zone" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <Bar dataKey="ushering" stackId="a" fill="#3b82f6" name="Ushering" maxBarSize={40} />
            <Bar dataKey="security" stackId="a" fill="#f59e0b" name="Security" maxBarSize={40} />
            <Bar dataKey="medical" stackId="a" fill="#ef4444" name="Medical" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
