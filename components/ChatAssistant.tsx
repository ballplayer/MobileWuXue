import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Sparkles, Bot, User } from 'lucide-react';
import { GeminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

interface Props {
  onBack: () => void;
}

export const ChatAssistant: React.FC<Props> = ({ onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'Hello! I am your AI Teaching Assistant. How can I help you learn today?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Prepare history for Gemini
    const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
    }));

    const responseText = await GeminiService.chat(history, userMsg.text);

    const botMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText || "Sorry, I didn't catch that.", timestamp: new Date() };
    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 relative">
      <div className="bg-white shadow-sm border-b p-4 flex items-center gap-4 z-10">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full">
            <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-brand-400 to-purple-500 rounded-full flex items-center justify-center text-white">
                <Sparkles size={16} />
            </div>
            <h2 className="font-bold text-lg text-slate-800">AI Assistant</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.map(m => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[80%] gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${m.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-brand-100 text-brand-600'}`}>
                        {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        m.role === 'user' 
                        ? 'bg-brand-600 text-white rounded-tr-none' 
                        : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                    }`}>
                        {m.text}
                    </div>
                </div>
            </div>
        ))}
        {loading && (
             <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border shadow-sm ml-11">
                    <div className="flex gap-1">
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                    </div>
                </div>
             </div>
        )}
      </div>

      <div className="p-4 bg-white border-t">
        <div className="max-w-4xl mx-auto flex gap-2">
            <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask anything..."
                className="flex-1 bg-slate-100 border-0 rounded-full px-6 py-3 focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all outline-none"
            />
            <button 
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="bg-brand-600 text-white p-3 rounded-full hover:bg-brand-700 disabled:opacity-50 transition-colors shadow-md"
            >
                <Send size={20} />
            </button>
        </div>
      </div>
    </div>
  );
};