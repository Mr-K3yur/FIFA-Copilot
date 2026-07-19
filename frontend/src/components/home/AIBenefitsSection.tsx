import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, LineChart } from 'lucide-react';

export const AIBenefitsSection: React.FC = () => {
  return (
    <section id="ai-benefits" className="py-24 relative overflow-hidden">
      {/* Decorative gradient background for this specific section */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Text Content */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Supercharged by <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Gemini 2.5 Flash</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                We've integrated Google's most capable multimodal AI to process vast amounts of unstructured stadium data instantly. It doesn't just display data; it understands context and provides actionable recommendations.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: <Brain className="w-5 h-5 text-blue-400" />, title: 'Contextual Understanding', text: 'Analyzes weather, social sentiment, and historical data simultaneously.' },
                  { icon: <Zap className="w-5 h-5 text-yellow-400" />, title: 'Sub-second Inference', text: 'Delivers operational directives before bottlenecks can even form.' },
                  { icon: <LineChart className="w-5 h-5 text-emerald-400" />, title: 'Predictive Analytics', text: 'Foresee issues 30-45 minutes ahead of time with high accuracy.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="mt-1 bg-slate-900 border border-white/10 p-2 rounded-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Visual Showcase (Glassmorphic Mockup) */}
          <div className="flex-1 w-full max-w-xl lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-2xl bg-slate-900/80 border border-white/10 shadow-2xl backdrop-blur-xl p-2"
            >
              <div className="bg-slate-950 rounded-xl overflow-hidden border border-white/5 relative">
                {/* Mock UI Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-slate-900/50">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs text-slate-500 font-medium">Copilot Insights</span>
                </div>
                {/* Mock UI Content */}
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <SparklesIcon className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-slate-800/80 border border-white/5 rounded-2xl rounded-tl-none p-4 text-sm text-slate-300">
                      <p className="mb-2"><strong>AI Alert:</strong> Potential congestion detected at North Gate (Sector 4).</p>
                      <p className="text-emerald-400">Recommendation: Open overflow gates N-4A and N-4B immediately. Redirect fans via digital signage.</p>
                    </div>
                  </div>
                  
                  <div className="h-32 rounded-lg bg-slate-800/50 border border-white/5 flex items-end px-4 py-2 gap-2">
                    {/* Mock Chart Bars */}
                    {[40, 60, 45, 80, 100, 75, 60, 40].map((h, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + (i * 0.1), duration: 0.5 }}
                        className={`w-full rounded-t-sm ${h > 75 ? 'bg-red-400' : 'bg-blue-400/80'}`} 
                      />
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-slate-500">
                    <span>16:00</span>
                    <span>North Gate Flow Rate (Live)</span>
                    <span>17:00</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

// Helper component
const SparklesIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4M3 5h4"/>
  </svg>
)
