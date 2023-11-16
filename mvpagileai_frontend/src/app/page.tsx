"use client"
import React, { useState, useEffect } from 'react';
import Body from './components/Body';
import Navbar from './components/Navbar';
import Onboarding from './components/onboarding/Onboarding';
import { ThemeProvider } from './theme/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const queryClient = new QueryClient();

const Home: React.FC = () => {
  const router = useRouter();
  if (typeof localStorage !== 'undefined' && !localStorage.getItem("isLoggedIn")) {
    // Set an initial value if it doesn't exist
    localStorage.setItem("isLoggedIn", "false");
  }
  const li = typeof window !== 'undefined' ? localStorage.getItem("isLoggedIn") === 'true' : false;
  // New state for managing login status
  const [isLoggedIn, setIsLoggedIn] = useState(li);

  // Initialize showOnboarding state based on localStorage value
  const [showOnboarding, setShowOnboarding] = useState(
    false
  );

  const closeOnboarding = () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('hasCompletedOnboarding', 'true');
    }
    setShowOnboarding(false);
  };
  // New effect for checking login status
  useEffect(() => {

    // Onboarding logic
    const hasCompletedOnboarding = false; //localStorage.getItem('hasCompletedOnboarding');
    if (hasCompletedOnboarding) {
      setShowOnboarding(false);
    }
  }, []);

  //If the user is not logged in, show the login page
  if (!isLoggedIn) {
    router.push('/login');
  }

  // If the user is logged in, show the main content
  return (
    <QueryClientProvider client={queryClient}>

    <ThemeProvider>
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-darkestgray p-4">
        <Navbar isLoggedIn={isLoggedIn}/>
        {showOnboarding ? (
          <Onboarding closeOnboarding={closeOnboarding} />
        ) : (
          <Body isLoggedIn={isLoggedIn}/>
        )}
      </div>
    </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Home;