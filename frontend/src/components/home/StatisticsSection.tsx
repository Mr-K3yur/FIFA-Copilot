import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '104', label: 'Matches' },
  { value: '16', label: 'Host Cities' },
  { value: '48', label: 'Nations' },
  { value: '6M+', label: 'Expected Fans' },
];

export const StatisticsSection: React.FC = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-white/10 rounded-3xl p-10 md:p-16 relative overflow-hidden">
          {/* Decorative blurred blob inside the stats box */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center justify-center text-center px-4"
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-emerald-400 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
