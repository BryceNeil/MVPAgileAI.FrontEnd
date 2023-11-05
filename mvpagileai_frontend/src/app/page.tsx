"use client"
import React, { useState, useEffect } from 'react';
import Body from './components/Body';
import Navbar from './components/Navbar';
import LoginPage from './components/login/LoginPage';
import Onboarding from './components/onboarding/Onboarding';
import { ThemeProvider } from './theme/ThemeContext';

const Home: React.FC = () => {
  // New state for managing login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Initialize showOnboarding state based on localStorage value
  const [showOnboarding, setShowOnboarding] = useState(
    !localStorage.getItem('hasCompletedOnboarding')
  );

  const closeOnboarding = () => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    setShowOnboarding(false);
  };

  // New effect for checking login status
  useEffect(() => {
    // Check if user is logged in (for the sake of this example, we use localStorage)
    const isUserLoggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(isUserLoggedIn === 'true');

    // Onboarding logic
    const hasCompletedOnboarding = false; //localStorage.getItem('hasCompletedOnboarding');
    if (hasCompletedOnboarding) {
      setShowOnboarding(false);
    }
  }, []);

  // Handler for when the user logs in successfully
  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  // If the user is not logged in, show the login page
  // if (!isLoggedIn) {
  //   return <LoginPage onLogin={handleLogin} />;
  // }

  // If the user is logged in, show the main content
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-darkestgray p-4">
        <Navbar />
        {showOnboarding ? (
          <Onboarding closeOnboarding={closeOnboarding} />
        ) : (
          <Body />
        )}
      </div>
    </ThemeProvider>
  );
};

export default Home;