import React from 'react';
// Import your UserIcon and AgileAI Icon here

const Message = ({ from, text }) => {
  return (
    <div className={`flex items-start w-full p-4 ${from === 'computer' ? 'bg-gray-50 border-t border-gray-200' : 'bg-white'}`}>
      <div className="mr-4">
        <img src={from === 'user' ? "/UserIcon.svg" : "/AgileAILogo4.svg"} alt="Logo" className="w-10 h-10" />
      </div>
      <div className="flex-grow">
        <p className="text-left text-gray-800">
          {text}
        </p>
      </div>
    </div>
  );
};

export default Message;
