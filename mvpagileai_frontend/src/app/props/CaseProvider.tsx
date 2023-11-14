// CaseContext.js

import React, { createContext, useState, useContext } from 'react';

const CaseContext = createContext();

export const useCase = () => useContext(CaseContext);

export const CaseProvider = ({ children }) => {
    const [caseData, setCaseData] = useState(null);

    return (
        <CaseContext.Provider value={{ caseData, setCaseData }}>
            {children}
        </CaseContext.Provider>
    );
};
