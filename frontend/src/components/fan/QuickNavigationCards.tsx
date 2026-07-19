import React from 'react';
import { motion } from 'framer-motion';
import { Navigation, Car, Utensils, Train, MapPin } from 'lucide-react';

const navItems = [
  { id: 'washroom', title: 'Nearest Washroom', icon: <Navigation />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { id: 'food', title: 'Food & Drinks', icon: <Utensils />, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  { id: 'parking', title: 'Find My Car', icon: <Car />, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { id: 'transit', title: 'Public Transit', icon: <Train />, color: 'text-amber-400', bg: 'bg-amber-400/10' },
];

export const QuickNavigationCards: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {navItems.map((item, index) => (
        <motion.button
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          className="flex flex-col items-center justify-center p-6 bg-slate-900/60 border border-white/10 rounded-2xl hover:bg-slate-800/80 hover:border-white/20 transition-all group backdrop-blur-md"
        >
          <div className={`p-4 rounded-full mb-3 transition-transform group-hover:scale-110 ${item.bg} ${item.color}`}>
            {React.cloneElement(item.icon as React.ReactElement, { className: 'w-6 h-6' })}
          </div>
          <span className="text-sm font-semibold text-slate-300 group-hover:text-white text-center">
            {item.title}
          </span>
          <div className="mt-2 flex items-center text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
            <MapPin className="w-3 h-3 mr-1" />
            <span>Show on map</span>
          </div>
        </motion.button>
      ))}
    </div>
  );
};
