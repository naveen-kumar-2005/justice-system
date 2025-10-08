
import React, { useState, useCallback } from 'react';
import { View } from '../types';
import { summarizeLegalResearch } from '../services/geminiService';
import Spinner from './shared/Spinner';
import BackButton from './shared/BackButton';

interface LegalResearchViewProps {
  navigateTo: (view: View) => void;
}

const LegalResearchView: React.FC<LegalResearchViewProps> = ({ navigateTo }) => {
  const [topic, setTopic] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResearch = useCallback(async () => {
    if (topic.trim() === '' || isLoading) return;

    setIsLoading(true);
    setError(null);
    setSummary('');

    try {
      const result = await summarizeLegalResearch(topic);
      setSummary(result);
    } catch (err) {
      setError('Failed to perform legal research. Please try a different topic.');
    } finally {
      setIsLoading(false);
    }
  }, [topic, isLoading]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-4">
        <BackButton onClick={() => navigateTo(View.DASHBOARD)} />
        <h2 className="text-3xl font-bold text-brand-gold-200 ml-4">Legal Research Automation</h2>
      </div>

      <div className="bg-brand-gray-800 p-6 rounded-lg border border-brand-gold-900">
        <label htmlFor="researchTopic" className="block text-lg font-medium text-brand-gold-200 mb-2">
          Enter Research Topic or Case Law
        </label>
        <input
          id="researchTopic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., 'Precedents on bail under Section 439 CrPC' or 'Kesavananda Bharati v. State of Kerala'"
          className="w-full p-3 bg-brand-gray-700 text-white rounded-lg border border-brand-gray-600 focus:ring-2 focus:ring-brand-gold-500 focus:outline-none"
          disabled={isLoading}
        />
        <button
          onClick={handleResearch}
          disabled={isLoading || !topic.trim()}
          className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-gold-600 text-white font-bold rounded-lg hover:bg-brand-gold-700 disabled:bg-brand-gray-600 disabled:cursor-not-allowed"
        >
          {isLoading ? <><Spinner /> Researching...</> : 'Get Research Summary'}
        </button>
      </div>

      {error && <p className="text-red-400 text-center mt-4">{error}</p>}
      
      {summary && (
        <div className="mt-8 p-6 bg-brand-gray-800 rounded-lg border border-brand-gold-700 animate-fade-in">
          <h3 className="text-2xl font-bold text-brand-gold-300 mb-4">Research Summary</h3>
          <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap">
            {summary}
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalResearchView;
