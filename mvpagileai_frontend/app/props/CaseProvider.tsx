// CaseContext.js


import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

const CaseContext = createContext<any>({});

export const useCase = () => useContext(CaseContext);

type CaseProviderProps = {
    children: ReactNode;
};

export const CaseProvider = ({ children }: CaseProviderProps) => {
    const [caseData, setCaseData] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // New state
    const [selectedView, setSelectedView] = useState('problem'); // New state

    

    
    return (
        <CaseContext.Provider value={{ caseData, setCaseData, currentQuestionIndex, setCurrentQuestionIndex, selectedView, setSelectedView}}>
            {children}
        </CaseContext.Provider>
    );
};