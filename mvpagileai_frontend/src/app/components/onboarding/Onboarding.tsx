// src/app/components/onboarding/Onboarding.tsx

"use client";

import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, X } from 'react-feather';

const Onboarding: React.FC<{ closeOnboarding: () => void }> = ({ closeOnboarding }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 7; // Number of slides

  const SlideContent = ({ title, subtitle, SvgImage }) => (
    <div className="flex flex-col items-center p-4 justify-between h-full">
      {/* Header with gray background */}
      <div className="w-full px-6 py-3 flex items-center justify-between">
        {/* <img src="/AgileAILogo4.svg" alt="Agile AI Logo" className="w-8 h-8" /> Logo */}
        <div className="text-black">AgileAI</div>
        <button onClick={closeOnboarding} className="text-gray-400 hover:text-gray-600">
          <X size={24} /> {/* Close button */}
        </button>
      </div>
      {/* SVG Image */}
      {SvgImage && <SvgImage className="w-full max-w-xs h-auto" />} {/* SVG image component */}
      {/* Main content */}
      <div className="px-6 py-4 flex-grow text-center">
        <h2 className="text-xl text-black mb-4">{title}</h2>
        <p className="text-sm text-gray-600 mb-6">{subtitle}</p>
      </div>
      {/* Navigation dots */}
      {/* <div className="flex justify-center space-x-2 mb-4">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <span
            key={index}
            className={`inline-block h-2 w-2 rounded-full ${index === currentSlide ? 'bg-black' : 'bg-gray-300'}`}
          />
        ))}
      </div> */}
      {/* Navigation buttons */}
      <div className="flex justify-between items-center w-full px-6 pb-4">
        {currentSlide > 0 ? (
          <button onClick={() => setCurrentSlide(currentSlide - 1)} className="flex items-center text-gray-400 text-sm text-gray-700">
            <ChevronLeft size={20} className="mr-2" />Back
          </button>
        ) : (
          <div /> // Empty div to maintain alignment
        )}
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
    // Assuming you have a data structure for your slides
    const slides = [
      { title: "Welcome to Agile AI", subtitle: "Your journey begins here" },
      { title: "Converse with AI-interviewer", subtitle: "Hone your interview skills with AI" },
      // ... more slide data
    ];

    if (currentSlide < slides.length) {
      const { title, subtitle } = slides[currentSlide];
      return <SlideContent title={title} subtitle={subtitle} />;
    }
    // You can place a default content or even a 404 slide here
    return <SlideContent title="Unknown Slide" subtitle="This slide is not configured" />;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg relative w-full max-w-2xl"> {/* Adjusted for a wider modal */}
        {renderSlideContent()}
      </div>
    </div>
  );
};

export default Onboarding;
