
import React, { useState, useCallback } from 'react';
import { View } from './types';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ChatView from './components/ChatView';
import CasePredictionView from './components/CasePredictionView';
import LegalResearchView from './components/LegalResearchView';
import CaseUploadView from './components/CaseUploadView';
import BiasDetectionView from './components/BiasDetectionView';
import { Icon } from './components/shared/Icon';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.LANDING);

  const navigateTo = useCallback((view: View) => {
    setCurrentView(view);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard navigateTo={navigateTo} />;
      case View.CHAT:
        return <ChatView navigateTo={navigateTo} />;
      case View.PREDICTION:
        return <CasePredictionView navigateTo={navigateTo} />;
      case View.RESEARCH:
        return <LegalResearchView navigateTo={navigateTo} />;
      case View.UPLOAD:
        return <CaseUploadView navigateTo={navigateTo} />;
      case View.BIAS:
        return <BiasDetectionView navigateTo={navigateTo} />;
      case View.LANDING:
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center text-white p-8">
            <Icon name="scale" className="w-24 h-24 text-brand-gold-400 mb-6" />
            <h1 className="text-5xl md:text-6xl font-extrabold text-brand-gold-200 tracking-tight leading-tight">
              Justice Meets Technology
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-gray-300">
              Leveraging Artificial Intelligence to deliver faster, fairer, and more accessible justice for all.
            </p>
            <button
              onClick={() => navigateTo(View.DASHBOARD)}
              className="mt-10 inline-flex items-center gap-3 px-8 py-4 bg-transparent hover:bg-brand-gold-600 border-2 border-brand-gold-500 hover:border-brand-gold-600 text-brand-gold-400 hover:text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Icon name="chat" className="w-6 h-6" />
              Ask AI Justice
            </button>
          </div>
        );
    }
  };

  return (
    <div className="bg-brand-gray-900 min-h-screen font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
