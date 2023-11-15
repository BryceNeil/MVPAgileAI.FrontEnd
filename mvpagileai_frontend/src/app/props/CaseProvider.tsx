// CaseContext.js

import React, { createContext, useState, useContext } from 'react';

const CaseContext = createContext();

export const useCase = () => useContext(CaseContext);

export const CaseProvider = ({ children }) => {
    const [caseData, setCaseData] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // New state
    const [selectedView, setSelectedView] = useState('problem'); // New state


    return (
        <CaseContext.Provider value={{ caseData, setCaseData, currentQuestionIndex, setCurrentQuestionIndex, selectedView, setSelectedView }}>
            {children}
        </CaseContext.Provider>
    );
};
