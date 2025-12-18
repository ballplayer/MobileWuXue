import React from 'react';
import { Camera, FileText, MessageCircle, BarChart2, BookOpen, LogOut, ChevronRight } from 'lucide-react';
import { ViewState } from '../types';

interface Props {
  onNavigate: (view: ViewState) => void;
}

export const Dashboard: React.FC<Props> = ({ onNavigate }) => {
  const features = [
    { id: 'PHOTO_SEARCH', icon: '📸', title: '拍搜搜题', desc: '秒出解析', color: 'bg-blue-500' },
    { id: 'SMART_GRADING', icon: '📝', title: '智能批改', desc: '手写识别', color: 'bg-indigo-500' },
    { id: 'CHAT', icon: '🤖', title: 'AI 导师', desc: '随时提问', color: 'bg-violet-500' },
    { id: 'EXAM_MGMT', icon: '📊', title: '成绩分析', desc: '学情看板', color: 'bg-emerald-500' },
    { id: 'QUESTION_BANK', icon: '📚', title: '智能题库', desc: '精品考卷', color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-full bg-slate-50 p-5 pb-10">
      {/* Top Profile */}
      <div className="flex justify-between items-center mb-6 pt-4">
        <div>
            <h1 className="text-2xl font-black text-slate-800">悟学 <span className="text-brand-600">Smart</span></h1>
            <p className="text-sm text-slate-500 mt-0.5">👋 老师您好，开始工作吧</p>
        </div>
        <button onClick={() => onNavigate('LOGIN')} className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
            <LogOut size={18} className="text-slate-400" />
        </button>
      </div>

      {/* Main Feature List - Mobile Style */}
      <div className="space-y-4">
        {features.map((f) => (
          <div 
            key={f.id}
            onClick={() => onNavigate(f.id as ViewState)}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">{f.icon}</div>
              <div>
                <h3 className="font-bold text-slate-800">{f.title}</h3>
                <p className="text-xs text-slate-400">{f.desc}</p>
              </div>
            </div>
            <ChevronRight className="text-slate-300" size={18} />
          </div>
        ))}
      </div>

      {/* Status Card */}
      <div className="mt-8 bg-brand-50 rounded-2xl p-4 border border-brand-100">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <h4 className="font-bold text-sm text-brand-800">系统在线</h4>
        </div>
        <p className="text-xs text-brand-600 leading-relaxed">
          AI 模型 v2.5 运行正常。
          <br />
          今天已为您批改了 **124** 份试卷。
        </p>
      </div>
      
      {/* Interaction Prompts */}
      <div className="mt-6 space-y-2">
        <p className="text-xs text-slate-400 font-bold uppercase ml-1">常用入口</p>
        <button onClick={() => onNavigate('PHOTO_SEARCH')} className="w-full text-left p-4 bg-gradient-to-r from-brand-600 to-brand-500 text-white rounded-2xl font-bold shadow-lg shadow-brand-100 flex justify-between items-center">
          👉 `[ 立即拍照搜题 ]`
          <Camera size={18} />
        </button>
      </div>
    </div>
  );
};