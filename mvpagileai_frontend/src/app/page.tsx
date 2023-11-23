"use client"
import React, { useState, useEffect } from 'react';
import Body from './components/Body';
import Navbar from './components/Navbar';
import Onboarding from './components/onboarding/Onboarding';
import { ThemeProvider } from './theme/ThemeContext';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const queryClient = new QueryClient();

const Home: React.FC = () => {

  const router = useRouter();
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem("accessToken") || '' : undefined;

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

  useEffect(() => {
    if(!accessToken){
      console.log("Not seein yo auth profile fuck face")
      router.push("/login")
    }
  }, [accessToken])
  

  // If the user is logged in, show the main content
  return (
    <QueryClientProvider client={queryClient}>  
      <ThemeProvider>
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-darkestgray p-4">
          <Navbar accessToken={accessToken}/>
          {showOnboarding ? (
            <Onboarding closeOnboarding={closeOnboarding} />
          ) : (
            (accessToken &&
              <Body accessToken={accessToken}/>
            )
            
          )}
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Home;