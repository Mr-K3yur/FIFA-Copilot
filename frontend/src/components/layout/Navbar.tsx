import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronRight, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'AI Benefits', href: '#ai-benefits' },
    { name: 'Architecture', href: '#architecture' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-border py-4 shadow-sm'
          : 'bg-transparent border-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-blue-500 to-emerald-400 p-2 rounded-lg text-white group-hover:scale-105 transition-transform">
            <Globe className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            FIFA Copilot
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(`/${user?.role.toLowerCase()}`)}
                className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 font-medium"
              >
                <User className="w-4 h-4" />
                {user?.name}
              </button>
              <button 
                onClick={logout}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full text-sm font-medium backdrop-blur-sm transition-all border border-white/10"
            >
              Get Started
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border overflow-hidden"
          >
            <div className="flex flex-col px-4 py-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-slate-300 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              
              {isAuthenticated ? (
                <>
                  <button 
                    onClick={() => navigate(`/${user?.role.toLowerCase()}`)}
                    className="mt-2 text-emerald-400 font-medium text-left p-2"
                  >
                    Go to Dashboard
                  </button>
                  <button 
                    onClick={logout}
                    className="text-slate-400 font-medium text-left p-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => navigate('/login')}
                  className="mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white px-5 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/25 transition-all"
                >
                  Get Started
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
