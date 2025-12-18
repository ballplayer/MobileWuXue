import React, { useState } from 'react';
import { ArrowLeft, Filter, Plus, FileText, ShoppingCart, Search } from 'lucide-react';
import { Question } from '../types';

interface Props {
    onBack: () => void;
}

const MOCK_QUESTIONS: Question[] = [
    { id: 'q1', title: '已知 2x + 5 = 15，求 x 的值', difficulty: 'Easy', tags: ['代数', '一元一次'], source: '2023 期中' },
    { id: 'q2', title: '求函数 f(x) = x² 在 x=2 处的导数', difficulty: 'Medium', tags: ['微积分', '导数'], source: '高考模拟' },
    { id: 'q3', title: '简述广义相对论的核心思想。', difficulty: 'Hard', tags: ['物理', '理论'], source: '竞赛题目' },
    { id: 'q4', title: '下列哪个城市是法国的首都？', difficulty: 'Easy', tags: ['地理'], source: '常识' },
];

export const QuestionBank: React.FC<Props> = ({ onBack }) => {
    const [basket, setBasket] = useState<Question[]>([]);

    const addToBasket = (q: Question) => {
        if (!basket.find(i => i.id === q.id)) {
            setBasket([...basket, q]);
        }
    };

    return (
        <div className="min-h-full bg-slate-50 flex flex-col">
            {/* Top Navigation */}
            <div className="bg-white border-b p-4 flex items-center justify-between sticky top-0 z-20">
                <div className="flex items-center">
                    <button onClick={onBack} className="p-2 mr-2"><ArrowLeft size={20}/></button>
                    <h2 className="font-bold">智能题库</h2>
                </div>
                <button className="relative p-2 bg-brand-50 rounded-xl text-brand-600">
                    <ShoppingCart size={20} />
                    {basket.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{basket.length}</span>}
                </button>
            </div>

            {/* Filter Buttons (Mobile Style) */}
            <div className="p-4 flex gap-2 overflow-x-auto no-scrollbar bg-white shadow-sm mb-2">
                <button className="px-4 py-2 bg-brand-600 text-white rounded-full text-xs font-bold whitespace-nowrap">全部</button>
                <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-xs font-bold whitespace-nowrap">数学</button>
                <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-xs font-bold whitespace-nowrap">物理</button>
                <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-xs font-bold whitespace-nowrap">化学</button>
            </div>

            {/* Content List */}
            <div className="flex-1 p-4 space-y-4">
                {MOCK_QUESTIONS.map(q => (
                    <div key={q.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                            <div className="flex gap-2">
                                <span className="px-2 py-1 bg-brand-50 text-brand-600 text-[10px] rounded font-bold">{q.tags[0]}</span>
                                <span className={`px-2 py-1 text-[10px] rounded font-bold ${q.difficulty === 'Hard' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                    {q.difficulty === 'Hard' ? '🔥 困难' : '✅ 简单'}
                                </span>
                            </div>
                        </div>
                        <h3 className="font-medium text-slate-800 text-sm leading-relaxed">{q.title}</h3>
                        <div className="flex justify-between items-center mt-2 pt-3 border-t">
                            <span className="text-[10px] text-slate-400">来源: **{q.source}**</span>
                            <button 
                                onClick={() => addToBasket(q)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 ${
                                    basket.find(i => i.id === q.id) 
                                    ? 'bg-green-100 text-green-600' 
                                    : 'bg-brand-600 text-white'
                                }`}
                            >
                                {basket.find(i => i.id === q.id) ? '已加入' : '👉 [ 选题 ]'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating Action Button */}
            {basket.length > 0 && (
                <div className="fixed bottom-10 left-0 right-0 p-6 flex justify-center pointer-events-none">
                     <button 
                        onClick={() => alert(`准备生成 ${basket.length} 道题目的试卷...`)}
                        className="pointer-events-auto bg-brand-600 text-white px-8 py-4 rounded-full font-bold shadow-2xl flex items-center gap-2 transform active:scale-95 transition-all"
                    >
                        🚀 `[ 生成卷子 (${basket.length}) ]`
                    </button>
                </div>
            )}
        </div>
    );
};