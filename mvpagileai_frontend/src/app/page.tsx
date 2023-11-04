"use client"
import React, { useState } from 'react';
import Body from './components/Body';
import Navbar from './components/Navbar';
import Onboarding from './components/onboarding/Onboarding';

const Home: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);

  const closeOnboarding = () => setShowOnboarding(false);
  
  return (
      <div className="flex flex-col min-h-screen bg-gray-100 p-4">  
        {/* <h1 className="text-center text-4xl mb-8">Page Header</h1> */}
        <Navbar />
        <Body />
        {showOnboarding && <Onboarding closeOnboarding={closeOnboarding} />}
      </div>
    );
};

export default Home;
