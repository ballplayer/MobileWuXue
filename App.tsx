import React, { useState } from 'react';
import { ViewState } from './types';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { PhotoSearch } from './components/PhotoSearch';
import { SmartGrading } from './components/SmartGrading';
import { ChatAssistant } from './components/ChatAssistant';
import { ExamManagement } from './components/ExamManagement';
import { QuestionBank } from './components/QuestionBank';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('LOGIN');

  const renderView = () => {
    switch (currentView) {
      case 'LOGIN':
        return <Login onLogin={() => setCurrentView('HOME')} />;
      case 'HOME':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'PHOTO_SEARCH':
        return <PhotoSearch onBack={() => setCurrentView('HOME')} />;
      case 'SMART_GRADING':
        return <SmartGrading onBack={() => setCurrentView('HOME')} />;
      case 'CHAT':
        return <ChatAssistant onBack={() => setCurrentView('HOME')} />;
      case 'EXAM_MGMT':
        return <ExamManagement onBack={() => setCurrentView('HOME')} />;
      case 'QUESTION_BANK':
        return <QuestionBank onBack={() => setCurrentView('HOME')} />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center overflow-hidden">
      {/* Mobile Phone Simulation Container */}
      <div className="relative w-full max-w-[430px] h-screen bg-white overflow-hidden shadow-2xl flex flex-col">
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {renderView()}
        </div>
        
        {/* iOS Home Bar Indicator */}
        <div className="h-6 bg-white w-full flex items-center justify-center pb-2">
          <div className="w-32 h-1.5 bg-slate-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default App;