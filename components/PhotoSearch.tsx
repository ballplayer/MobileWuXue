import React, { useState } from 'react';
import { Camera, ArrowLeft, RefreshCw, Sparkles } from 'lucide-react';
import { GeminiService } from '../services/geminiService';

interface Props {
  onBack: () => void;
}

export const PhotoSearch: React.FC<Props> = ({ onBack }) => {
  const [image, setImage] = useState<string | null>(null);
  const [solution, setSolution] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setSolution(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image && !inputText) return;
    setLoading(true);
    const cleanBase64 = image ? image.split(',')[1] : undefined;
    const result = await GeminiService.solveProblem(inputText, cleanBase64);
    setSolution(result || "未能生成解析。");
    setLoading(false);
  };

  return (
    <div className="min-h-full bg-slate-50 flex flex-col">
      <div className="bg-white border-b p-4 flex items-center sticky top-0 z-20">
        <button onClick={onBack} className="p-2 mr-2"><ArrowLeft size={20} /></button>
        <h2 className="font-bold">拍照搜题</h2>
      </div>

      <div className="flex-1 p-5 space-y-6 overflow-y-auto">
        {/* Upload Area */}
        {!image ? (
            <label className="w-full h-64 bg-white border-2 border-dashed border-slate-300 rounded-3xl flex flex-col items-center justify-center gap-4 cursor-pointer active:bg-slate-50">
                <Camera size={48} className="text-brand-500" />
                <div className="text-center">
                    <p className="font-bold text-slate-800">👉 `[ 点击拍照/上传 ]`</p>
                    <p className="text-[10px] text-slate-400 mt-1">数学 | 物理 | 化学 | 英语</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
            </label>
        ) : (
            <div className="relative">
                <img src={image} alt="Problem" className="w-full rounded-3xl shadow-md border" />
                <button 
                  onClick={() => setImage(null)}
                  className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-full"
                >
                  <RefreshCw size={16} />
                </button>
            </div>
        )}

        <div className="space-y-4">
            <p className="text-xs text-slate-400 font-bold uppercase ml-1">⌨️ 或手动输入题目</p>
            <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="在此输入文字题目..."
                className="w-full p-4 bg-white border border-slate-100 rounded-2xl shadow-sm h-24 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
            />
            
            <button
                onClick={handleAnalyze}
                disabled={loading || (!image && !inputText)}
                className="w-full bg-brand-600 text-white py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
                {loading ? <RefreshCw className="animate-spin" size={20} /> : <Sparkles size={20} />}
                {loading ? 'AI 正在全力解析...' : '👉 [ 立即开始解析 ]'}
            </button>
        </div>

        {/* Vertical Result Flow */}
        {solution && (
            <div className="bg-white rounded-3xl p-6 shadow-md border border-brand-100 space-y-4">
                <div className="flex items-center gap-2 border-b pb-3 mb-2">
                    <div className="w-8 h-8 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center">
                        <Sparkles size={16}/>
                    </div>
                    <h3 className="font-bold text-slate-800">AI 解答</h3>
                </div>
                <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {solution}
                </div>
                <div className="pt-4 flex justify-end">
                    <button onClick={() => {setImage(null); setSolution(null); setInputText("");}} className="text-brand-600 text-xs font-bold">
                        👉 `[ 搜下一题 ]`
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};