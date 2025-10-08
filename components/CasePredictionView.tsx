
import React, { useState, useCallback } from 'react';
import { View, CasePrediction } from '../types';
import { predictCaseOutcome } from '../services/geminiService';
import Spinner from './shared/Spinner';
import BackButton from './shared/BackButton';
import { Icon } from './shared/Icon';

interface CasePredictionViewProps {
  navigateTo: (view: View) => void;
}

const CasePredictionView: React.FC<CasePredictionViewProps> = ({ navigateTo }) => {
  const [caseDetails, setCaseDetails] = useState('');
  const [prediction, setPrediction] = useState<CasePrediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = useCallback(async () => {
    if (caseDetails.trim() === '' || isLoading) return;

    setIsLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const result = await predictCaseOutcome(caseDetails);
      setPrediction(result);
    } catch (err) {
      setError('Failed to predict the case outcome. The AI might be unable to process this request.');
    } finally {
      setIsLoading(false);
    }
  }, [caseDetails, isLoading]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-4">
        <BackButton onClick={() => navigateTo(View.DASHBOARD)} />
        <h2 className="text-3xl font-bold text-brand-gold-200 ml-4">Case Outcome Predictor</h2>
      </div>

      <div className="bg-brand-gray-800 p-6 rounded-lg border border-brand-gold-900">
        <label htmlFor="caseDetails" className="block text-lg font-medium text-brand-gold-200 mb-2">
          Enter Case Details
        </label>
        <textarea
          id="caseDetails"
          rows={10}
          value={caseDetails}
          onChange={(e) => setCaseDetails(e.target.value)}
          placeholder="Describe the case facts, charges, evidence presented, and relevant legal sections..."
          className="w-full p-3 bg-brand-gray-700 text-white rounded-lg border border-brand-gray-600 focus:ring-2 focus:ring-brand-gold-500 focus:outline-none"
          disabled={isLoading}
        />
        <button
          onClick={handlePredict}
          disabled={isLoading || !caseDetails.trim()}
          className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-gold-600 text-white font-bold rounded-lg hover:bg-brand-gold-700 disabled:bg-brand-gray-600 disabled:cursor-not-allowed"
        >
          {isLoading ? <><Spinner /> Predicting...</> : 'Predict Outcome'}
        </button>
      </div>

      {error && <p className="text-red-400 text-center mt-4">{error}</p>}
      
      {prediction && (
        <div className="mt-8 p-6 bg-brand-gray-800 rounded-lg border border-brand-gold-700 animate-fade-in">
          <h3 className="text-2xl font-bold text-brand-gold-300 mb-4">Prediction Result</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Predicted Outcome</h4>
              <p className="text-lg text-white">{prediction.prediction}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Reasoning</h4>
              <p className="text-gray-300 whitespace-pre-wrap">{prediction.reasoning}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Confidence Score</h4>
              <div className="w-full bg-brand-gray-700 rounded-full h-4 mt-2">
                <div 
                  className="bg-brand-gold-500 h-4 rounded-full" 
                  style={{ width: `${prediction.confidenceScore}%` }}>
                </div>
              </div>
              <p className="text-center text-brand-gold-200 font-bold mt-1">{prediction.confidenceScore}%</p>
            </div>
             <p className="text-xs text-brand-gold-700 italic pt-4">*Disclaimer: This is an AI-generated prediction for informational purposes only and does not constitute legal advice.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CasePredictionView;
