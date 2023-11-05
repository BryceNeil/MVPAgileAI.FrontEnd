// LoginPage.tsx
import React, { useState } from 'react';
import { useTheme } from '@/app/theme/ThemeContext'; // Ensure this is the correct path

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
  onSignUp: (email: string, password: string) => void;
  // Functions for social media sign-in can be added as needed
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { theme } = useTheme(); // Assuming a theme context is provided

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin(email, password);
  };

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSignUp(email, password);
  };

  // Placeholder functions for social sign-in buttons
  const signInWithGoogle = () => console.log('Sign in with Google');
  const signInWithFacebook = () => console.log('Sign in with Facebook');
  const signInWithApple = () => console.log('Sign in with Apple ID');

  return (
    <div className={`flex items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Get started</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none"
            type="submit"
          >
            Log In
          </button>
        </form>
        <div className="flex flex-col items-center mt-6">
          <button
            className="w-full px-6 py-2 mb-2 text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none"
            onClick={signInWithGoogle}
          >
            Sign in with Google
          </button>
          <button
            className="w-full px-6 py-2 mb-2 text-white bg-blue-800 rounded hover:bg-blue-900 focus:outline-none"
            onClick={signInWithFacebook}
          >
            Sign in with Facebook
          </button>
          <button
            className="w-full px-6 py-2 text-white bg-black rounded hover:bg-gray-900 focus:outline-none"
            onClick={signInWithApple}
          >
            Sign in with Apple ID
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
