
import React from 'react';
import { Icon } from './Icon';

interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-brand-gold-400 hover:text-brand-gold-200 transition-colors p-2 rounded-md hover:bg-brand-gray-700"
    >
      <Icon name="back" className="w-5 h-5" />
      <span className="font-semibold">Back</span>
    </button>
  );
};

export default BackButton;
