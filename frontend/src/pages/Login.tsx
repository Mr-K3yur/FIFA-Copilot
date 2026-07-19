import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth, Role } from '../context/AuthContext';
import { Shield, Users, Briefcase, UserRound } from 'lucide-react';

const roles: { type: Role; icon: React.ReactNode; color: string; desc: string }[] = [
  { type: 'Fan', icon: <UserRound className="w-8 h-8" />, color: 'from-blue-500 to-cyan-400', desc: 'Experience the stadium' },
  { type: 'Organizer', icon: <Briefcase className="w-8 h-8" />, color: 'from-purple-500 to-pink-500', desc: 'Manage operations' },
  { type: 'Volunteer', icon: <Users className="w-8 h-8" />, color: 'from-orange-500 to-amber-400', desc: 'Assist fans on-site' },
  { type: 'Security', icon: <Shield className="w-8 h-8" />, color: 'from-emerald-500 to-teal-400', desc: 'Monitor safety' },
];

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: Role) => {
    login(role);
    navigate(`/${role.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Select Your Role</h1>
          <p className="text-slate-400">Mock authentication to access specific Copilot dashboards.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role, idx) => (
            <motion.button
              key={role.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              onClick={() => handleLogin(role.type)}
              className="group relative flex flex-col items-center p-8 bg-slate-900 border border-white/10 rounded-2xl hover:border-white/20 hover:bg-slate-800 transition-all text-left"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
              
              <div className={`p-4 rounded-full bg-slate-950 border border-white/5 mb-6 text-white bg-gradient-to-br ${role.color}`}>
                {role.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{role.type}</h3>
              <p className="text-sm text-slate-400 text-center">{role.desc}</p>
            </motion.button>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button 
            onClick={() => navigate('/')}
            className="text-slate-500 hover:text-white text-sm transition-colors"
          >
            ← Back to Landing Page
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
