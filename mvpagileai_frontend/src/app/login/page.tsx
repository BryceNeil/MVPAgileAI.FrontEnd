// LoginPage.jsx
"use client"
import React, { ChangeEvent, useState } from 'react';
import { ChevronRight } from 'react-feather'; // Import the icon
import { useTheme } from '@/app/theme/ThemeContext'; // Ensure this is the correct path
import { useRouter } from "next/navigation";
import { API_URL } from '../../../consts';

const LoginPage = () => {
    const { theme } = {theme: 'light'};
    const router = useRouter();
    const [displayLogin, setDisplayLogin] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const toggleLogin = () => {
        setDisplayLogin(true);
    }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const handleSubmit = async () => {
        try {
          const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          });
          if (response.ok) {
            console.log(formData)
            console.log('Server Response:', response);
            router.push('/');
          } 
            else {
              const errorData = await response.json();
              console.error('Login failed:', errorData)
          }
        } catch (error){
          console.error('Error:', error);
        }
      }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      {/* White container */}
      <div className="w-full max-w-sm bg-white rounded-lg flex flex-col justify-between">
        <div>
          {/* Logo and text at the top */}
          <div className="flex flex-row justify-between items-center py-4 px-8">
            <img src="/AgileAILogo4.svg" alt="AgileAI Logo" className={`w-10 h-7 ${theme === 'dark' ? 'filter invert' : ''}`} />
            <span className="text-gray-500 ml-2 text-sm font-normal">AgileAI</span>
          </div>
          {/* Form content */}
          <h2 className="text-xl font-bold mb-10 text-gray-800 text-center">Get started</h2>
          {!displayLogin ? (
            <div className="flex flex-col items-center px-6">
            {/* Login and Sign Up buttons */}
            <div className="flex justify-between w-full mb-8">
              <button onClick={toggleLogin} className="flex flex-row items-center py-3 pr-6 pl-3 text-black bg-transparent rounded hover:bg-blue-100">
                Login with Email
                <ChevronRight className="ml-2" />
              </button>
            </div>
            {/* Social Sign In buttons */}
            <button className="flex flex-row justify-between w-full px-6 py-5 mb-2 text-blue-500 bg-transparent rounded border border-blue-500 hover:bg-blue-50">
              Sign in with Google
              <ChevronRight className="ml-2" />
            </button>
            <button className="flex flex-row justify-between w-full px-6 py-5 mb-2 text-blue-500 bg-transparent rounded border border-blue-500 hover:bg-blue-50">
              Sign in with Facebook
              <ChevronRight className="ml-2" />
            </button>
            <button className="flex flex-row justify-between w-full px-6 py-5 mb-5 text-blue-500 bg-transparent rounded border border-blue-500 hover:bg-blue-50">
              Sign in with Apple ID
              <ChevronRight className="ml-2" />
            </button>
          </div>
          ) : (
            <div className="flex flex-col items-center px-6">
                <form />
                <input placeholder="Email" type="email" onChange={handleInputChange} name="email" value={formData.email} required className="text-black border border-gray-400 rounded px-3 py-2"/> 
                <input placeholder="Password" type="password" onChange={handleInputChange} name="password" value={formData.password} required className="text-black border border-gray-400 rounded px-3 py-2"/>
                <button onClick={handleSubmit} type="submit" className="b w-full justify-between flex flex-row text-gray-400 px-14 hover:bg-gray-300">
                    Login
                    <ChevronRight className="ml-2" />
                </button>
                <form />
            </div>
          )}
          
        </div>
        {/* Footer content */}
        <div className="flex flex-col items-center pb-10">
          <div className="flex items-center cursor-pointer mb-6" onClick = {() => router.push("/")}>
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
