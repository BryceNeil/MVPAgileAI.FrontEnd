import React, { useState } from 'react';

const InterviewAILogo = () => {

  return (
    <div 
      className={`flex font-semibold text-xs text-gray-900 items-center mr-4 '}`}
    >
      <img 
        src="/ailogo.svg" 
        alt="AI Logo" 
        className={`mr-2 w-6 h-6'}`} 
        style={{width: '16px', height: '16px'}}
      />
      Interview AI
    </div>
  );
};

export default InterviewAILogo;
