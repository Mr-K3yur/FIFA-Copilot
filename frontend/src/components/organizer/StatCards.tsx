import React from 'react';
import { motion } from 'framer-motion';
import { Users, Car, CloudRain, Bell, Stethoscope, BadgeCheck } from 'lucide-react';

const stats = [
  { title: 'Crowd Density', value: '78%', trend: '+5%', status: 'warning', icon: <Users /> },
  { title: 'Parking Capacity', value: '92%', trend: '-2%', status: 'critical', icon: <Car /> },
  { title: 'Weather', value: 'Clear', trend: '72°F', status: 'good', icon: <CloudRain /> },
  { title: 'Active Alerts', value: '3', trend: 'New in Sector 4', status: 'warning', icon: <Bell /> },
  { title: 'Medical Requests', value: '2', trend: 'Stable', status: 'good', icon: <Stethoscope /> },
  { title: 'Active Volunteers', value: '145', trend: '98% deployed', status: 'good', icon: <BadgeCheck /> },
];

const statusColors = {
  good: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  warning: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  critical: 'text-red-400 bg-red-400/10 border-red-400/20',
};

export const StatCards: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className={`p-4 rounded-xl border ${statusColors[stat.status as keyof typeof statusColors]} backdrop-blur-md flex flex-col`}
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-slate-300 text-xs font-medium uppercase tracking-wider">{stat.title}</span>
            <div className="opacity-70">{React.cloneElement(stat.icon as React.ReactElement, { className: 'w-4 h-4' })}</div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
          <div className="text-xs opacity-80 mt-auto">{stat.trend}</div>
        </motion.div>
      ))}
    </div>
  );
};
