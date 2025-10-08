
import React from 'react';
import { View } from '../types';
import Card from './shared/Card';
import { IconName } from './shared/Icon';

interface DashboardProps {
  navigateTo: (view: View) => void;
}

const features: { title: string; description: string; icon: IconName; view: View }[] = [
  {
    title: 'AI Legal Assistant',
    description: 'Ask legal queries to our AI, trained on Indian laws and past judgments.',
    icon: 'chat',
    view: View.CHAT,
  },
  {
    title: 'Case Outcome Predictor',
    description: 'Predict possible judgments based on case patterns and evidence data.',
    icon: 'prediction',
    view: View.PREDICTION,
  },
  {
    title: 'Legal Research Automation',
    description: 'Automatically summarize case laws, statutes, and relevant precedents.',
    icon: 'research',
    view: View.RESEARCH,
  },
  {
    title: 'Analyze Case Document',
    description: 'Upload a PDF or text file to extract and analyze key legal points.',
    icon: 'upload',
    view: View.UPLOAD,
  },
  {
    title: 'Bias Detection Engine',
    description: 'Analyze judgments and legal documents for potential bias and inconsistencies.',
    icon: 'bias',
    view: View.BIAS,
  },
];

const Dashboard: React.FC<DashboardProps> = ({ navigateTo }) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-brand-gold-200 mb-8 text-center">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <Card
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            onClick={() => navigateTo(feature.view)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
