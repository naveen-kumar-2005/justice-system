
import React from 'react';
import { Icon, IconName } from './Icon';

interface CardProps {
  title: string;
  description: string;
  icon: IconName;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-brand-gray-800 p-6 rounded-lg border border-brand-gold-900 hover:border-brand-gold-700 hover:bg-brand-gray-700/50 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-brand-gold-900/50"
    >
      <div className="flex items-center gap-4">
        <Icon name={icon} className="w-10 h-10 text-brand-gold-500 group-hover:text-brand-gold-400 transition-colors" />
        <h3 className="text-xl font-bold text-brand-gold-200 group-hover:text-brand-gold-100 transition-colors">{title}</h3>
      </div>
      <p className="mt-4 text-gray-400">{description}</p>
    </div>
  );
};

export default Card;
