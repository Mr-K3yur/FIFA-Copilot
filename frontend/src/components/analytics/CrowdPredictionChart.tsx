import React from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion, Variants } from 'framer-motion';

const data = [
  { sector: 'N1', actual: 88, predicted: 90 },
  { sector: 'N2', actual: 75, predicted: 70 },
  { sector: 'E1', actual: 95, predicted: 98 },
  { sector: 'E2', actual: 60, predicted: 55 },
  { sector: 'S1', actual: 45, predicted: 50 },
  { sector: 'S2', actual: 80, predicted: 78 },
  { sector: 'W1', actual: 92, predicted: 88 },
  { sector: 'W2', actual: 65, predicted: 60 },
  { sector: 'VIP', actual: 100, predicted: 100 },
];

// Optimization 1: Extract animation variants to avoid object recreation
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } }
};

// Optimization 2: Hoist static styling objects outside the component 
// to prevent Recharts from executing deep comparisons/re-renders on every cycle.
const CHART_MARGIN = { top: 10, right: 10, left: -20, bottom: 0 };
const TOOLTIP_CONTENT_STYLE = { backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' };
const TOOLTIP_CURSOR_STYLE = { fill: 'rgba(255, 255, 255, 0.05)' };
const LEGEND_WRAPPER_STYLE = { fontSize: '12px', paddingTop: '10px' };
const BAR_RADIUS: [number, number, number, number] = [4, 4, 0, 0];
const DOT_STYLE = { r: 4, fill: '#f59e0b' };

// Optimization 3: Wrap component in React.memo
export const CrowdPredictionChart: React.FC = React.memo(() => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-md h-full flex flex-col"
    >
      <h3 className="text-lg font-semibold text-white mb-4">Crowd Density vs AI Prediction</h3>
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={CHART_MARGIN}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="sector" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} unit="%" />
            <Tooltip 
              contentStyle={TOOLTIP_CONTENT_STYLE}
              cursor={TOOLTIP_CURSOR_STYLE}
            />
            <Legend wrapperStyle={LEGEND_WRAPPER_STYLE} />
            <Bar dataKey="actual" fill="#10b981" radius={BAR_RADIUS} name="Actual Density" maxBarSize={40} />
            <Line type="monotone" dataKey="predicted" stroke="#f59e0b" strokeWidth={3} dot={DOT_STYLE} name="AI Predicted" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
});

CrowdPredictionChart.displayName = 'CrowdPredictionChart';
