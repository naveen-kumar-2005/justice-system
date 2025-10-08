
import React, { useState, useCallback } from 'react';
import { View } from '../types';
import { analyzeCaseDocument } from '../services/geminiService';
import Spinner from './shared/Spinner';
import BackButton from './shared/BackButton';
import { Icon } from './shared/Icon';

interface CaseUploadViewProps {
  navigateTo: (view: View) => void;
}

const CaseUploadView: React.FC<CaseUploadViewProps> = ({ navigateTo }) => {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf' || selectedFile.type === 'text/plain') {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        setError(null);
      } else {
        setError('Invalid file type. Please upload a PDF or TXT file.');
        setFile(null);
        setFileName('');
      }
    }
  };

  const handleAnalyze = useCallback(async () => {
    if (!file || isLoading) return;

    setIsLoading(true);
    setError(null);
    setAnalysis('');

    try {
      // For this demo, we'll read text files. PDF parsing would require a library.
      if (file.type !== 'text/plain') {
        throw new Error('For this demo, only .txt files can be read directly. PDF processing is not implemented.');
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result as string;
        try {
            const result = await analyzeCaseDocument(text);
            setAnalysis(result);
        } catch (apiError) {
             setError('Failed to analyze the document with AI. Please try again.');
        } finally {
            setIsLoading(false);
        }
      };
      reader.onerror = () => {
        setError('Failed to read the file.');
        setIsLoading(false);
      };
      reader.readAsText(file);
    } catch (err) {
      setError((err as Error).message);
      setIsLoading(false);
    }
  }, [file, isLoading]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-4">
        <BackButton onClick={() => navigateTo(View.DASHBOARD)} />
        <h2 className="text-3xl font-bold text-brand-gold-200 ml-4">Analyze Case Document</h2>
      </div>

      <div className="bg-brand-gray-800 p-6 rounded-lg border border-brand-gold-900">
        <label
          htmlFor="file-upload"
          className="relative cursor-pointer bg-brand-gray-700 rounded-lg border-2 border-dashed border-brand-gold-800 hover:border-brand-gold-600 p-8 flex flex-col items-center justify-center text-center"
        >
          <Icon name="upload" className="w-12 h-12 text-brand-gold-500 mb-4" />
          <span className="block text-lg font-semibold text-brand-gold-200">
            {fileName ? `Selected: ${fileName}` : 'Choose a file to upload'}
          </span>
          <span className="block text-sm text-gray-400">
            (PDF or TXT)
          </span>
          <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.txt" />
        </label>

        <button
          onClick={handleAnalyze}
          disabled={isLoading || !file}
          className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-gold-600 text-white font-bold rounded-lg hover:bg-brand-gold-700 disabled:bg-brand-gray-600 disabled:cursor-not-allowed"
        >
          {isLoading ? <><Spinner /> Analyzing Document...</> : 'Extract Legal Points'}
        </button>
      </div>

      {error && <p className="text-red-400 text-center mt-4">{error}</p>}
      
      {analysis && (
        <div className="mt-8 p-6 bg-brand-gray-800 rounded-lg border border-brand-gold-700 animate-fade-in">
          <h3 className="text-2xl font-bold text-brand-gold-300 mb-4">Analysis Results</h3>
          <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap">
            {analysis}
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseUploadView;
