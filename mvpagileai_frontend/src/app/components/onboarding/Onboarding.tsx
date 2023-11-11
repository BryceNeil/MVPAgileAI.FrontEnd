// src/app/components/onboarding/Onboarding.tsx

"use client";

import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, X } from 'react-feather';
import OfferedJobSectors from './onboardingAnimations/OfferedJobSectors';

const Onboarding: React.FC<{ closeOnboarding: () => void }> = ({ closeOnboarding }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 7; // Number of slides

  const SlideContent: React.FC<{ title: string, subtitle: string, Component?: React.ComponentType}> = ({ title, subtitle, Component}) => (
    <div className="flex flex-col items-center px-2 py-4 justify-between h-full">
      {/* Header */}
      <div className="w-full px-6 py-3 flex items-center justify-between">
        <div className="text-black">AgileAI</div>
        <button onClick={closeOnboarding} className="text-gray-400 hover:text-gray-600">
          <X size={16} /> {/* Close button */}
        </button>
      </div>
      
      {/* Optional component to render */}
      {Component && <Component />} 
  
      {/* Main content */}
      <div className="px-6 py-4 flex-grow text-center">
        <h2 className="text-xl font-medium text-black mb-4">{title}</h2>
        <p className="text-sm text-gray-400 mb-6">{subtitle}</p>
      </div>
  
      {/* Navigation dots - always centered */}
      <div className="flex justify-center space-x-2 mb-4">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <span
            key={index}
            className={`inline-block h-2 w-2 rounded-full ${index === currentSlide ? 'bg-black' : 'bg-gray-300'}`}
          />
        ))}
      </div>
  
      {/* Navigation buttons */}
      <div className="flex justify-between items-center w-full px-6 pb-4">
        {currentSlide > 0 ? (
          <button onClick={() => setCurrentSlide(currentSlide - 1)} className="flex items-center text-gray-400 text-sm text-gray-700">
            <ChevronLeft size={20} className="mr-2" />Back
          </button>
        ) : (
          <div className="flex-1"></div> // Use flex-1 to fill space and maintain center alignment of dots
        )}
        
        <div className="flex-1"></div> {/* This div ensures spacing and centering */}
  
        <button
          onClick={currentSlide < totalSlides - 1 ? () => setCurrentSlide(currentSlide + 1) : closeOnboarding}
          className="flex items-center text-black text-sm py-2 px-4 rounded"
        >
          {currentSlide === totalSlides - 1 ? 'Finish' : <><span>Next</span> <ChevronRight size={20} className="ml-2" /></>}
        </button>
      </div>
    </div>
  );
  
  

  const renderSlideContent = () => {
    const slides = [
        {
            title: "AI Interview Practice",
            subtitle: "Engage with our AI interviewer for a realistic practice experience.",
            Component: OfferedJobSectors, // Replace with actual component
        },
        {
            title: "Question Creation",
            subtitle: "Enter a job name, job posting url, or describe the job you want to prep for.",
            Component: OfferedJobSectors, // Replace with actual component
        },
        {
            title: "Job Sectors Offered",
            subtitle: "We are starting with Consulting with more industry mocks to come.",
            Component: OfferedJobSectors, // Assuming this component displays the job sectors
        },
        // {
        //   title: "Category Selection",
        //   subtitle: "We generate the categoreis Choose from various question categories to tailor your interview.",
        //   Component: OfferedJobSectors, // Replace with actual component
        // },
        {
            title: "Understand the Rubric",
            subtitle: "Gain insights into how companies evaluate answers with our detailed rubrics.",
            Component: OfferedJobSectors, // Replace with actual component
        },
        {
          title: "Earn Points for Quality",
          subtitle: "Receive points for the quality of your responses and track your progress.",
          Component: OfferedJobSectors, // Replace with actual component
        },
        {
          title: "Dark Mode Settings",
          subtitle: "Adjust theme settings to dark mode for a comfortable interview prep experience.",
          Component: OfferedJobSectors, // Replace with actual component
        },
        {
          title: "Start Your First Interview",
          subtitle: "Set up and begin your first AI-powered interview right away.",
          Component: OfferedJobSectors, // Replace with actual component
        },
      ];

    // Check if the currentSlide index is within bounds
    if (currentSlide < slides.length) {
        const { title, subtitle, Component } = slides[currentSlide];
        return <SlideContent title={title} subtitle={subtitle} Component={Component} />;
      }
  
      // Fallback content
      return <SlideContent title="Unknown Slide" subtitle="This slide is not configured"/>;
    };

  // bg-opacity-20 backdrop-blur-md 
  return (
    <div className="fixed inset-0 flex bg-gray-100 justify-center items-center z-50">
      <div className="bg-white rounded-xl border border-gray-200 relative w-full max-w-2xl"> {/* Adjusted for a wider modal */}
        {renderSlideContent()}
      </div>
    </div>
  );
};

export default Onboarding;
