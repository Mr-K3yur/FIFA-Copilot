import React from 'react';
import { motion } from 'framer-motion';
import { Users, Navigation, AlertTriangle, Coffee, Activity, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: <Users className="w-6 h-6 text-blue-400" />,
    title: 'Crowd Dynamics',
    description: 'Predictive modeling to prevent bottlenecks and ensure smooth fan movement across concourses.'
  },
  {
    icon: <Navigation className="w-6 h-6 text-emerald-400" />,
    title: 'Smart Routing',
    description: 'Dynamic wayfinding directing fans to the shortest queues for restrooms and concessions.'
  },
  {
    icon: <AlertTriangle className="w-6 h-6 text-amber-400" />,
    title: 'Incident Prediction',
    description: 'AI detects anomalies in stadium data to proactively deploy security and medical staff.'
  },
  {
    icon: <Coffee className="w-6 h-6 text-purple-400" />,
    title: 'Inventory Optimization',
    description: 'Real-time forecasting for food and merchandise based on match sentiment and attendance.'
  },
  {
    icon: <Activity className="w-6 h-6 text-pink-400" />,
    title: 'Energy Management',
    description: 'Automated HVAC and lighting adjustments tailored to stadium occupancy and weather.'
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-teal-400" />,
    title: 'Access Control',
    description: 'Seamless integration with ticketing systems to manage gate load balancing.'
  }
];

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Intelligent Operations Suite
          </h2>
          <p className="text-slate-400 text-lg">
            A comprehensive set of tools designed to handle the massive scale and complexity of World Cup venues.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-900/50 border border-white/10 p-8 rounded-2xl hover:bg-slate-800/80 transition-colors group relative overflow-hidden backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="bg-slate-950 p-3 rounded-xl inline-flex border border-white/5 mb-6 shadow-inner relative z-10">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 relative z-10">{feature.title}</h3>
              <p className="text-slate-400 relative z-10 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
