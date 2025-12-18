import React, { useState } from 'react';
import { ArrowLeft, Users, BarChart2, ChevronRight, User, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { ClassData, Student } from '../types';

interface Props {
  onBack: () => void;
}

const MOCK_CLASSES: ClassData[] = [
  {
    id: 'c1', name: '高一 1 班', grade: '10', averageScore: 88.5, studentCount: 32,
    students: [
        { id: 's1', name: '张小凡', score: 98, rank: 1, weakness: '几何证明' },
        { id: 's2', name: '李碧瑶', score: 92, rank: 5, weakness: '概率计算' },
        { id: 's3', name: '陆雪琪', score: 95, rank: 2, weakness: '无明显短板' },
        { id: 's4', name: '林惊羽', score: 85, rank: 12, weakness: '函数解析' },
    ],
    radarData: [
        { subject: '代数', A: 120, B: 110, fullMark: 150 },
        { subject: '几何', A: 98, B: 130, fullMark: 150 },
        { subject: '概率', A: 86, B: 130, fullMark: 150 },
        { subject: '函数', A: 99, B: 100, fullMark: 150 },
        { subject: '物理', A: 65, B: 85, fullMark: 150 },
    ]
  },
  { id: 'c2', name: '高一 2 班', grade: '10', averageScore: 82.3, studentCount: 30, students: [], radarData: [] }
];

export const ExamManagement: React.FC<Props> = ({ onBack }) => {
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const goBack = () => {
    if (level === 3) setLevel(2);
    else if (level === 2) setLevel(1);
    else onBack();
  };

  const renderClassList = () => (
    <div className="p-4 space-y-4">
        <p className="text-xs text-slate-400 font-bold uppercase mb-2">🏫 班级管理</p>
        {MOCK_CLASSES.map(c => (
            <div key={c.id} onClick={() => { setSelectedClass(c); setLevel(2); }} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between active:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center font-bold">
                        {c.name.substring(0,2)}
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800">{c.name}</h3>
                        <p className="text-xs text-slate-400">👥 **{c.studentCount}** 位学生 | 💯 均分 **{c.averageScore}**</p>
                    </div>
                </div>
                <ChevronRight size={18} className="text-slate-300" />
            </div>
        ))}
    </div>
  );

  const renderClassDetail = () => (
    <div className="p-4 space-y-6">
        {/* Charts Container */}
        <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                <h3 className="font-bold text-sm text-slate-700 mb-4 flex items-center gap-2">📊 知识点覆盖情况</h3>
                <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart outerRadius="70%" data={selectedClass?.radarData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" fontSize={10} />
                            <Radar name="班级均值" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.6} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        {/* Student List - Card View */}
        <div className="space-y-3">
            <p className="text-xs text-slate-400 font-bold uppercase ml-1">📋 学生名单 (点击查看详情)</p>
            {selectedClass?.students.map(s => (
                <div key={s.id} onClick={() => { setSelectedStudent(s); setLevel(3); }} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between active:scale-95 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600">
                            {s.rank}
                        </div>
                        <div>
                            <p className="font-bold text-slate-800">👤 {s.name}</p>
                            <p className="text-xs text-slate-400">💯 分数: **{s.score}** | 🏆 排名: **Top {s.rank}**</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-[10px] bg-red-50 text-red-500 px-2 py-1 rounded-md font-bold">⚠️ {s.weakness}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  const renderStudentDetail = () => (
      <div className="p-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 shadow-md border border-brand-100 text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 text-2xl font-black mx-auto mb-4">
                  {selectedStudent?.name[0]}
              </div>
              <h2 className="text-xl font-bold">{selectedStudent?.name}</h2>
              <p className="text-xs text-slate-400 mb-4">{selectedClass?.name} | 学号: **{selectedStudent?.id}**</p>
              
              <div className="flex justify-around border-t pt-4">
                  <div>
                      <p className="text-2xl font-black text-brand-600">{selectedStudent?.score}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">考试分数</p>
                  </div>
                  <div className="border-x px-6">
                      <p className="text-2xl font-black text-slate-800">{selectedStudent?.rank}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">班级排名</p>
                  </div>
              </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-100">
              <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2">🧠 AI 学情分析</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                  {selectedStudent?.name} 同学近期表现稳定。
                  <br />---<br />
                  🚀 **优势**: 代数基础扎实。
                  <br />---<br />
                  📉 **薄弱**: **{selectedStudent?.weakness}** 相关题目得分率偏低。
                  <br />---<br />
                  💡 **建议**: 针对几何模块补充 5 道基础练习。
              </p>
          </div>

          <button className="w-full bg-brand-600 text-white py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2">
            👉 `[ 生成个性化练习册 ]`
          </button>
      </div>
  );

  return (
    <div className="min-h-full bg-slate-50 flex flex-col">
      <div className="bg-white border-b p-4 flex items-center sticky top-0 z-20">
        <button onClick={goBack} className="p-2 mr-2 hover:bg-slate-100 rounded-full">
            <ArrowLeft size={20} />
        </button>
        <h2 className="font-bold text-slate-800">
            {level === 1 && '成绩看板'}
            {level === 2 && selectedClass?.name}
            {level === 3 && '学情详情'}
        </h2>
      </div>
      {level === 1 && renderClassList()}
      {level === 2 && renderClassDetail()}
      {level === 3 && renderStudentDetail()}
    </div>
  );
};