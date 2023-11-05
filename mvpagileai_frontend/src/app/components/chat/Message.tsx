import React from 'react';
// Import your UserIcon and AgileAI Icon here

const Message = ({ from, text }) => {
  return (
    <div className={`flex items-start w-full p-4 ${from === 'computer' ? 'bg-gray-50 border-t border-gray-200 flex-row' : 'bg-white flex-row-reverse'}`}>
      <div className="mx-4">
        <img src={from === 'user' ? "/UserIcon.svg" : "/AgileAILogo4.svg"} alt="Logo" className="w-10 h-10" />
      </div>
      <div className="flex flex-row w-full">
        <p className={`text-gray-800 ${from == "computer" ? "mr-auto" : "ml-auto"}`}>
          {text}
        </p>
      </div>
    </div>
  );
};

export default Message;
