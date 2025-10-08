
import React, { useState, useCallback } from 'react';
import { View } from '../types';
import { detectBias } from '../services/geminiService';
import Spinner from './shared/Spinner';
import BackButton from './shared/BackButton';

interface BiasDetectionViewProps {
  navigateTo: (view: View) => void;
}

const BiasDetectionView: React.FC<BiasDetectionViewProps> = ({ navigateTo }) => {
  const [judgmentText, setJudgmentText] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = useCallback(async () => {
    if (judgmentText.trim() === '' || isLoading) return;

    setIsLoading(true);
    setError(null);
    setAnalysis('');

    try {
      const result = await detectBias(judgmentText);
      setAnalysis(result);
    } catch (err) {
      setError('Failed to analyze the text for bias. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [judgmentText, isLoading]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-4">
        <BackButton onClick={() => navigateTo(View.DASHBOARD)} />
        <h2 className="text-3xl font-bold text-brand-gold-200 ml-4">Bias Detection Engine</h2>
      </div>

      <div className="bg-brand-gray-800 p-6 rounded-lg border border-brand-gold-900">
        <label htmlFor="judgmentText" className="block text-lg font-medium text-brand-gold-200 mb-2">
          Paste Judgment or Legal Text
        </label>
        <textarea
          id="judgmentText"
          rows={12}
          value={judgmentText}
          onChange={(e) => setJudgmentText(e.target.value)}
          placeholder="Paste the full text of a legal judgment or document here to analyze for potential biases..."
          className="w-full p-3 bg-brand-gray-700 text-white rounded-lg border border-brand-gray-600 focus:ring-2 focus:ring-brand-gold-500 focus:outline-none"
          disabled={isLoading}
        />
        <button
          onClick={handleAnalysis}
          disabled={isLoading || !judgmentText.trim()}
          className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-gold-600 text-white font-bold rounded-lg hover:bg-brand-gold-700 disabled:bg-brand-gray-600 disabled:cursor-not-allowed"
        >
          {isLoading ? <><Spinner /> Analyzing for Bias...</> : 'Analyze Text'}
        </button>
      </div>

      {error && <p className="text-red-400 text-center mt-4">{error}</p>}
      
      {analysis && (
        <div className="mt-8 p-6 bg-brand-gray-800 rounded-lg border border-brand-gold-700 animate-fade-in">
          <h3 className="text-2xl font-bold text-brand-gold-300 mb-4">Bias Analysis Report</h3>
          <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap">
            {analysis}
          </div>
        </div>
      )}
    </div>
  );
};

export default BiasDetectionView;
