import React from 'react';
import { Globe, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-border py-12 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-emerald-400 p-1.5 rounded text-white">
                <Globe className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white">FIFA Copilot</span>
            </a>
            <p className="text-slate-400 text-sm max-w-sm">
              Next-generation AI stadium operations platform designed to enhance the FIFA World Cup 2026 fan experience and streamline logistics.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="flex flex-col gap-2">
              <li><a href="#features" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">Features</a></li>
              <li><a href="#ai-benefits" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">AI Benefits</a></li>
              <li><a href="#architecture" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">Architecture</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="flex flex-col gap-2">
              <li><a href="#" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} FIFA Stadium AI Copilot. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            Built with <span className="text-red-500">♥</span> and AI.
          </div>
        </div>
      </div>
    </footer>
  );
};
