


import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useCase } from './CaseProvider';

const RubricContext = createContext<any>({});

export const useRubric = () => useContext(RubricContext);

type RubricProviderProps = {
    children: ReactNode;
};

export const RubricProvider = ({ children }: RubricProviderProps) => {
    const { caseData, currentQuestionIndex } = useCase();
    console.log(caseData)
    const [rubricData, setRubricData] = useState(null)
    const [answer, setAnswer] = useState('');
    useEffect(() =>{
        if(caseData){
            setRubricData(caseData.questions[currentQuestionIndex].rubric)
        }
    }, [caseData, currentQuestionIndex])

    
    const [isGraded, setIsGraded] = useState(() =>
        Array.from({ length: 5 }, () => false)
    );

    console.log(rubricData)

    
    return (
        <RubricContext.Provider value={{ rubricData, setRubricData, isGraded, setIsGraded }}>
            {children}
        </RubricContext.Provider>
    );
};