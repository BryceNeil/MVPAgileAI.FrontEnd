"use client"
import React from 'react';
import { useTheme } from '../theme/ThemeContext';


const InterviewAILogo = () => {
    const { theme } = useTheme(); // This will get the current theme ('light' or 'dark')
  return (
    <div className={`flex font-semibold text-xs items-center mr-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <img 
        src="/ailogo.svg" 
        alt="AI Logo" 
        className={`mr-2 w-6 h-6 ${theme === 'dark' ? 'filter invert' : ''}`} 
        style={{width: '16px', height: '16px'}}
      />
      Interview AI
    </div>
  );
};

export default InterviewAILogo;
