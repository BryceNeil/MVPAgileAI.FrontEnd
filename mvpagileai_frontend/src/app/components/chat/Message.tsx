import React, { useEffect, useState } from 'react';
import { getUserProfile } from '@/datafetch';
// Import your UserIcon and AgileAI Icon here

interface MessageProps {
  from : string,
  text : string,
}

const Message: React.FC<MessageProps> = ({ from, text }) => {
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem("accessToken") || '' : undefined;
  const userData = getUserProfile(accessToken);
  const [email, setEmail] = useState('');
  const [initial, setInitial] = useState('');
  useEffect(() => {
    if (accessToken) {
        getUserProfile(accessToken)
            .then(userData => {
                if (userData && userData.email) {
                    const userEmail = userData.email;
                    setEmail(userEmail);
                    const userInitial = userEmail.charAt(0);
                    setInitial(userInitial);
                } else {
                    console.error('User data or email not available.');
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }
}, [accessToken]);
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
