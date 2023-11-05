// LoginPage.jsx
import React, { useState } from 'react';
import { ChevronRight } from 'react-feather'; // Import the icon
import { useTheme } from '@/app/theme/ThemeContext'; // Ensure this is the correct path

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { theme } = useTheme();

  const handleLogin = (event) => {
    event.preventDefault();
    if (username === 'user' && password === 'pass') {
      onLogin(true);
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <div className="flex justify-end items-center min-h-screen bg-gray-100 p-6">
      {/* White container */}
      <div className="w-full max-w-sm bg-white rounded-lg flex flex-col justify-between">
        <div>
          {/* Logo and text at the top */}
          {/* <div className="flex items-center p-4">
            <img src="/AgileAILogo4.svg" alt="AgileAI Logo" className={`w-10 h-7 ${theme === 'dark' ? 'filter invert' : ''}`} />
            <span className="text-gray-500 ml-2 text-sm font-normal">AgileAI</span>
          </div> */}
          {/* Form content */}
          <h2 className="text-xl font-bold mt-10 mb-10 text-gray-800 text-center">Get started</h2>
          <form onSubmit={handleLogin} className="flex flex-col items-center px-6">
            {/* Login and Sign Up buttons */}
            <div className="flex w-full mb-4">
              <button className="flex-1 items-center px-6 py-3 text-black bg-transparent rounded mr-2">
                Login
                <ChevronRight className="ml-2" />
              </button>
              <button className="flex-1 items-center px-6 py-3 text-black bg-transparent rounded ml-2">
                Sign Up
                <ChevronRight className="ml-2" />
              </button>
            </div>
            {/* Social Sign In buttons */}
            <button className="w-full px-6 py-3 mb-2 text-blue-500 bg-transparent rounded border border-blue-500">
              Sign in with Google
              <ChevronRight className="ml-2" />
            </button>
            <button className="w-full px-6 py-3 mb-2 text-blue-500 bg-transparent rounded border border-blue-500">
              Sign in with Facebook
              <ChevronRight className="ml-2" />
            </button>
            <button className="w-full px-6 py-3 mb-2 text-blue-500 bg-transparent rounded border border-blue-500">
              Sign in with Apple ID
              <ChevronRight className="ml-2" />
            </button>
          </form>
        </div>
        {/* Footer content */}
        <div className="flex flex-col items-center pb-10">
          <div className="flex items-center mb-6">
            <img src="/AgileAILogo4.svg" alt="AgileAI Logo" className={`w-8 h-6 opacity-50 ${theme === 'dark' ? 'filter invert' : ''}`} />
            <span className="text-gray-500 ml-2 text-sm font-normal">AgileAI</span>
          </div>
          <div className="flex items-center">
            <button className="text-gray-500 text-xs focus:outline-none mr-2">Terms of Use</button>
            <div className="bg-gray-500 w-px h-4"></div>
            <button className="text-gray-500 text-xs focus:outline-none ml-2">Privacy Policy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
