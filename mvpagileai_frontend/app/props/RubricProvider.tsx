


import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useCase } from './CaseProvider';
import { Question, Rubric } from '@/app/types'

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
        if (caseData) {
            const rubrics = caseData.questions.map((question: Question) => question.rubric);
            const rubricData = rubrics.map((rubric: Rubric[]) =>
              rubric.map((item: Rubric) => ({
                criterion: item.criterion,
                description: item.description,
                weight: item.weight,
                grade: item.grade
              }))
            );
            setRubricData(rubricData);
            console.log(rubricData);
          }
          
    }, [caseData, currentQuestionIndex])

    
    const [isGraded, setIsGraded] = useState(() =>
        Array.from({ length: 5 }, () => false)
    );

    
    return (
        <RubricContext.Provider value={{ rubricData, setRubricData, isGraded, setIsGraded }}>
            {children}
        </RubricContext.Provider>
    );
};