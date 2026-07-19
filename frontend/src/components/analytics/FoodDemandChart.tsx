import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { time: '14:00', hotDogs: 200, beer: 500 },
  { time: '15:00', hotDogs: 800, beer: 2500 },
  { time: '16:00', hotDogs: 1500, beer: 5000 },
  { time: '17:00', hotDogs: 4500, beer: 12000 }, // Halftime spike
  { time: '18:00', hotDogs: 1200, beer: 3000 },
  { time: '19:00', hotDogs: 400, beer: 1500 },
];

export const FoodDemandChart: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-md h-full flex flex-col"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Food & Beverage Demand</h3>
        <span className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">Live Orders</span>
      </div>
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val / 1000}k`} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
            />
            <Line type="monotone" dataKey="beer" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} name="Beverages" />
            <Line type="monotone" dataKey="hotDogs" stroke="#ec4899" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} name="Food" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
