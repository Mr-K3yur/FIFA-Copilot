import React from 'react';
import { motion } from 'framer-motion';
import { Database, Layout, Server, Cpu } from 'lucide-react';

const techStack = [
  { name: 'Frontend', icon: <Layout />, text: 'React + Vite + Tailwind', color: 'text-cyan-400' },
  { name: 'Backend', icon: <Server />, text: 'FastAPI + Python', color: 'text-emerald-400' },
  { name: 'Database', icon: <Database />, text: 'SQLite / GeoJSON', color: 'text-blue-400' },
  { name: 'AI Engine', icon: <Cpu />, text: 'Gemini 2.5 API', color: 'text-purple-400' },
];

export const ArchitectureSection: React.FC = () => {
  return (
    <section id="architecture" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Robust Architecture
          </h2>
          <p className="text-slate-400 text-lg">
            Built on a modern, high-performance tech stack ensuring reliability during peak World Cup traffic.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-6 bg-slate-900/50 border border-white/5 rounded-2xl backdrop-blur-sm w-48 hover:bg-slate-800/80 transition-colors"
            >
              <div className={`mb-4 p-4 rounded-full bg-slate-950 border border-white/10 ${tech.color}`}>
                {React.cloneElement(tech.icon as React.ReactElement, { className: 'w-8 h-8' })}
              </div>
              <h4 className="text-white font-semibold mb-1">{tech.name}</h4>
              <p className="text-slate-400 text-xs text-center">{tech.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
