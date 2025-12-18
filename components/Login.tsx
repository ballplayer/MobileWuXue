import React, { useState } from 'react';
import { ViewState } from '../types';
import { Sparkles } from 'lucide-react';

interface Props {
  onLogin: () => void;
}

export const Login: React.FC<Props> = ({ onLogin }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '登录' || input.trim().toLowerCase() === 'login') {
        onLogin();
    } else {
        // Auto login for demo purposes even if text doesn't match perfectly, but show hint
        if (input.length > 0) onLogin();
    }
  };

  return (
    <div className="h-screen w-full bg-slate-900 flex items-center justify-center relative overflow-hidden">
       {/* Background decorative blobs */}
       <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
       <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

       <div className="z-10 bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-md text-center">
            <div className="w-20 h-20 bg-gradient-to-tr from-brand-500 to-purple-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg transform rotate-3">
                <Sparkles className="text-white w-10 h-10" />
            </div>
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">WuXue Model</h1>
            <p className="text-slate-300 mb-8 font-light">AI-Powered Educational Assistant</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type '登录' or 'Login'"
                    className="w-full bg-slate-800/50 border border-slate-600 text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all text-center"
                    autoFocus
                />
                <button 
                    type="submit"
                    className="w-full bg-white text-slate-900 font-bold py-3.5 rounded-xl hover:bg-slate-100 transition-colors shadow-lg"
                >
                    Enter System
                </button>
            </form>
            <p className="mt-6 text-xs text-slate-500">v1.0.0 • iPadOS Simulation</p>
       </div>
    </div>
  );
};