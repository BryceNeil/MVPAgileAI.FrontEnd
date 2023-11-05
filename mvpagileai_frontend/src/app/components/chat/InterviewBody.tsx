import React, { useEffect, useRef } from 'react';
import Message from './Message'; // Adjust the import path if necessary

const InterviewBody = () => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom);

  return (
    <div className="flex font-semibold text-xs items-center mr-4 text-gray-900 dark:text-white">
      <img 
        src="/ailogo.svg" 
        alt="AI Logo" 
        className="mr-2 w-6 h-6" 
        style={{ width: '24px', height: '24px' }} // Adjusted the size as per the style attribute
      />
      Interview AI
    </div>
  );
};

export default InterviewBody;
