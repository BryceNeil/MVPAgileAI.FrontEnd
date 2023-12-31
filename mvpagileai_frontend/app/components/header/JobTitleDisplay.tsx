import React, { useState, useEffect } from 'react';
import { useCase } from '@/app/props/CaseProvider';
import { useDashboard } from '@/app/props/DashboardProvider';

const JobTitleDisplay = () => {
  const { caseData } = useCase(); // Access the global state
  const defaultJobTitles = [
    "McKinsey Business Analyst",
    "BCG Strategy Consultant",
    "Deloitte Financial Advisor",
    "KPMG Audit Associate",
    "EY Tax Consultant",
    "Accenture Technology Consultant",
    "PwC Management Consultant",
    "Bain & Company Case Team Leader",
    "Oliver Wyman Senior Consultant",
    "Booz Allen Hamilton Cybersecurity Consultant",
    "Capgemini IT Consultant",
    "Cognizant Business Development Manager",
    "L.E.K. Consulting M&A Consultant",
    "Roland Berger Sustainability Consultant",
    "AT Kearney Operations Consultant",
    "Boston Consulting Group Digital Strategist",
    "Ernst & Young Risk Advisor",
    "Grant Thornton Economic Consultant",
    "Protiviti Governance Consultant",
    "Alvarez & Marsal Restructuring Advisor",
    "FTI Consulting Corporate Finance Consultant",
    "Marsh & McLennan Agency Consultant",
    "Gartner Research Director",
    "Navigant Consulting Energy Consultant",
    "A.T. Kearney Procurement Consultant",
    "ZS Associates Sales and Marketing Consultant",
    "Simon-Kucher & Partners Pricing Strategist"
  ];
  
  const [currentJobTitle, setCurrentJobTitle] = useState('');
  const [jobTitleIndex, setJobTitleIndex] = useState(0);
  const {dashboardVisible} = useDashboard();
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeWriter = () => {
      if (isDeleting) {
        if (charIndex > 0) {
          setCurrentJobTitle(prev => prev.slice(0, -1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setJobTitleIndex((jobTitleIndex + 1) % defaultJobTitles.length);
        }
      } else {
        if (charIndex < defaultJobTitles[jobTitleIndex].length) {
          setCurrentJobTitle(defaultJobTitles[jobTitleIndex].slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else if (!isDeleting) {
          setTimeout(() => setIsDeleting(true), 1000); // Wait 1 second before starting to delete
        }
      }
    };

    const timer = setTimeout(typeWriter, isDeleting ? 75 : 150);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, jobTitleIndex]);

  return (
    <h2 className={`w-full flex items-center h-8 py-0.5 px-2 text-sm rounded-md bg-semidarkgray text-white ${caseData?.jobTitle ? '' : ''}`}>
      {dashboardVisible ? (
        <div>Dashboard</div>
      ):(
        <div>{caseData && caseData?.jobTitle || currentJobTitle}</div>
      )}
      
    </h2>
  );
};

export default JobTitleDisplay;