
import React from 'react';
import { Icon } from './shared/Icon';

const Header: React.FC = () => {
  return (
    <header className="bg-brand-gray-800/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon name="scale" className="w-8 h-8 text-brand-gold-400" />
          <h1 className="text-xl font-bold text-white tracking-wider">
            AI Justice System
          </h1>
        </div>
        <div className="text-xs text-brand-gold-600 font-mono bg-brand-gray-900 px-2 py-1 rounded">
            HACK ELITE
        </div>
      </div>
      <div className="h-0.5 bg-gradient-to-r from-transparent via-brand-gold-700 to-transparent"></div>
    </header>
  );
};

export default Header;
