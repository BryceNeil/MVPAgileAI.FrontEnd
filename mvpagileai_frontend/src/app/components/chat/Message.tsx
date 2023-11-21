import React, { useEffect, useState } from 'react';
import { getUserProfile } from '@/datafetch';
// Import your UserIcon and AgileAI Icon here

interface MessageProps {
  from : string,
  text : string,
}

const Message: React.FC<MessageProps> = ({ from, text }) => {
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem("accessToken") || '' : undefined;
  const initial = typeof window !== 'undefined' ? localStorage.getItem("initial") || '' : undefined;
  return (
    <div className={`flex items-start w-full p-4 border-t border-gray-100 dark:border-semidarkgray ${from === 'computer' ? 'bg-white dark:bg-darkgray flex-row' : 'bg-white dark:bg-darkgray flex-row-reverse'}`}>
      <div className="mx-4">
        {from === 'user' ? (
          <div className="flex items-center justify-center cursor-pointer bg-blue-500 text-white rounded-full h-8 w-8">
          <span className="font-medium text-white uppercase">{initial}</span>
      </div>
        ):(
          <div>
            <img src={"/AgileAILogo4.svg"} alt="Logo" className="w-10 h-10" />
          </div>
          


        )}
        
      </div>
      <div className="flex flex-row w-full">
        <p className={`text-sm text-gray-800 dark:text-gray-100 ${from == "computer" ? "mr-auto" : "ml-auto"}`}>
          {text}
        </p>
      </div>
    </div>
  );
};

export default Message;
