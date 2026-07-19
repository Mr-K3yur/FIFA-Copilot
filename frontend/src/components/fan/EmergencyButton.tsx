import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertOctagon, PhoneCall, ShieldAlert, X } from 'lucide-react';

export const EmergencyButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);

  const handleTrigger = () => {
    setIsTriggered(true);
    // In a real app, this would send an SOS signal with GPS coordinates to the Security Dashboard
    setTimeout(() => {
      setIsModalOpen(false);
      setIsTriggered(false);
    }, 4000);
  };

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="flex flex-col items-center justify-center p-4 bg-red-500/10 border border-red-500/30 rounded-2xl hover:bg-red-500/20 transition-colors group h-full"
      >
        <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(239,68,68,0.5)] group-hover:shadow-[0_0_25px_rgba(239,68,68,0.8)] transition-all mb-3">
          <AlertOctagon className="w-6 h-6" />
        </div>
        <span className="text-red-400 font-bold tracking-wider">EMERGENCY</span>
        <span className="text-xs text-red-400/70 mt-1 text-center">Medical or Security</span>
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              {!isTriggered ? (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2 text-red-500">
                      <ShieldAlert className="w-6 h-6" />
                      <h2 className="text-xl font-bold">Emergency Assistance</h2>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <p className="text-slate-300 mb-6 text-sm">
                    Are you sure you want to trigger an emergency alert? Security and medical staff will be dispatched to your current location (Sector 4).
                  </p>
                  
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={handleTrigger}
                      className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <PhoneCall className="w-5 h-5" />
                      CONFIRM EMERGENCY
                    </button>
                    <button 
                      onClick={() => setIsModalOpen(false)}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }} 
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4"
                  >
                    <ShieldAlert className="w-8 h-8 text-red-500" />
                  </motion.div>
                  <h2 className="text-xl font-bold text-white mb-2">Alert Sent</h2>
                  <p className="text-emerald-400 text-sm">Help is on the way. Please stay where you are.</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
