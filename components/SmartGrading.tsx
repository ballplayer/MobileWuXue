import React, { useState } from 'react';
import { ArrowLeft, Upload, FileText, CheckCircle, AlertCircle, ChevronRight, Camera } from 'lucide-react';
import { GeminiService } from '../services/geminiService';

interface Props {
  onBack: () => void;
}

export const SmartGrading: React.FC<Props> = ({ onBack }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paperId, setPaperId] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [gradingResult, setGradingResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        startGrading(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startGrading = async (imgBase64: string) => {
    setLoading(true);
    const cleanBase64 = imgBase64.split(',')[1];
    const result = await GeminiService.gradePaper(cleanBase64);
    setGradingResult(result);
    setLoading(false);
    setStep(3);
  };

  if (step === 1) {
    return (
      <div className="h-full flex flex-col bg-slate-50 p-6">
        <button onClick={onBack} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-10"><ArrowLeft size={20}/></button>
        <div className="flex-1 flex flex-col justify-center text-center">
            <div className="text-5xl mb-6">📝</div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">智能批改</h2>
            <p className="text-sm text-slate-400 mb-8">输入试卷标识符或选择考试包</p>
            <input 
                type="text" 
                value={paperId}
                onChange={(e) => setPaperId(e.target.value)}
                placeholder="例如: 2024-MATH-01"
                className="w-full p-4 border rounded-2xl mb-4 text-center font-bold bg-white focus:ring-2 focus:ring-brand-500 outline-none"
            />
            <button 
                onClick={() => paperId && setStep(2)}
                disabled={!paperId}
                className="w-full bg-brand-600 text-white py-4 rounded-2xl font-bold shadow-lg disabled:opacity-50"
            >
                下一步
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-50 flex flex-col">
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <button onClick={() => setStep(1)} className="p-2"><ArrowLeft size={20}/></button>
        <h2 className="font-bold">批改结果: {paperId}</h2>
        <div className="w-8"></div>
      </div>

      <div className="flex-1 p-5 overflow-y-auto space-y-6">
        {loading ? (
            <div className="flex flex-col items-center justify-center pt-20">
                <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mb-4"></div>
                <p className="font-bold text-slate-700 italic">正在识别手写字迹...</p>
            </div>
        ) : step === 2 ? (
            <div className="flex flex-col items-center gap-6">
                <label className="w-full h-64 bg-white border-2 border-dashed border-slate-300 rounded-3xl flex flex-col items-center justify-center gap-4 active:bg-slate-50 cursor-pointer">
                    <Camera size={48} className="text-brand-500" />
                    <div className="text-center">
                        <p className="font-bold text-slate-800">👉 `[ 拍照/上传试卷 ]`</p>
                        <p className="text-xs text-slate-400 mt-1">支持多题同时识别</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                </label>
            </div>
        ) : (
            <div className="space-y-6 pb-10">
                {/* Score Card */}
                <div className="bg-brand-600 rounded-3xl p-6 text-white shadow-lg flex justify-between items-center">
                    <div>
                        <p className="text-[10px] font-bold uppercase opacity-80 mb-1">Total Score</p>
                        <p className="text-4xl font-black">{gradingResult?.totalScore}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold uppercase opacity-80 mb-1">Accuracy</p>
                        <p className="text-2xl font-bold">{gradingResult?.accuracy}</p>
                    </div>
                </div>

                {/* Vertical Flow: Image then analysis */}
                <div className="space-y-4">
                    <p className="text-xs text-slate-400 font-bold uppercase ml-1">📸 原始试卷</p>
                    <img src={image!} alt="Paper" className="w-full rounded-2xl shadow-sm border" />
                    
                    <p className="text-xs text-slate-400 font-bold uppercase ml-1">🧠 AI 批改详情</p>
                    
                    {/* Itemized Analysis */}
                    <div className="space-y-3">
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                            <h4 className="text-xs font-black text-blue-600 uppercase mb-2">📋 OCR 识别</h4>
                            <p className="text-sm text-slate-600 leading-relaxed italic">"{gradingResult?.ocrText}"</p>
                        </div>
                        
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 border-l-4 border-l-green-500">
                            <h4 className="text-xs font-black text-green-600 uppercase mb-2">✅ 标准答案</h4>
                            <p className="text-sm text-slate-700 font-medium">{gradingResult?.standardAnswer}</p>
                        </div>

                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 border-l-4 border-l-orange-500">
                            <h4 className="text-xs font-black text-orange-600 uppercase mb-2">💡 扣分原因</h4>
                            <p className="text-sm text-slate-600">{gradingResult?.reasoning}</p>
                        </div>
                    </div>
                </div>

                <button onClick={() => setStep(2)} className="w-full py-4 rounded-2xl bg-slate-100 text-slate-600 font-bold">
                    👉 `[ 下一份试卷 ]`
                </button>
            </div>
        )}
      </div>
    </div>
  );
};