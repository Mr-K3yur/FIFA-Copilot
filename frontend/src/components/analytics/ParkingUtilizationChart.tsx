import React from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { name: 'Lot A (General)', capacity: 95, fill: '#ef4444' }, // Almost full
  { name: 'Lot B (General)', capacity: 82, fill: '#f59e0b' },
  { name: 'Lot C (Transit)', capacity: 45, fill: '#10b981' },
  { name: 'VIP Lot', capacity: 100, fill: '#8b5cf6' },
];

const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
  fontSize: '12px',
  color: '#94a3b8'
};

export const ParkingUtilizationChart: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-md h-full flex flex-col"
    >
      <h3 className="text-lg font-semibold text-white mb-2">Parking Utilization</h3>
      <p className="text-xs text-slate-400 mb-4">Percentage filled per lot</p>
      
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            cx="40%" 
            cy="50%" 
            innerRadius="30%" 
            outerRadius="100%" 
            barSize={15} 
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              label={{ position: 'insideStart', fill: '#fff', fontSize: 10 }}
              background={{ fill: 'rgba(255, 255, 255, 0.05)' }}
              dataKey="capacity"
              cornerRadius={10}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
              formatter={(value) => [`${value}% Full`, 'Status']}
            />
            <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
