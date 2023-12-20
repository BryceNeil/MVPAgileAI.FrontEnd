"use client"
import React, { useState, useEffect } from 'react';
import Body from './components/body/Body';
import Navbar from './components/Navbar';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ThemeProvider } from './components/theme/ThemeContext';
import { useRouter } from 'next/navigation';
import { CaseProvider } from './props/CaseProvider';
import { LoadProvider } from './props/LoadProvider';

const queryClient = new QueryClient();

const Home: React.FC = () => {
  const router = useRouter();
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem("accessToken") || '' : undefined;

  useEffect(() => {
    if(!accessToken){
      console.log("Not seein yo auth profile fuck face")
      router.push("/login")
    }
  }, [accessToken, router])

  return (
    <QueryClientProvider client={queryClient}>  
      <ThemeProvider>
        <LoadProvider>
          <CaseProvider>
            <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-darkestgray p-4">
              <Navbar accessToken={accessToken}/>
              <Body accessToken={accessToken}/>
            </div>
          </CaseProvider>
        </LoadProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Home;