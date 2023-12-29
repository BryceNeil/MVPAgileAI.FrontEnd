import { useCase } from '@/app/props/CaseProvider';
import { useRubric } from '@/app/props/RubricProvider';
import { CaseData, Rubric } from '@/app/types';
import React, { useState } from 'react';


interface RubricComponentsProps {
  currentCase: CaseData

}

const RubricComponent: React.FC<RubricComponentsProps> = ({ currentCase }) => {
  // Accessing the rubric for the current question
  const { currentQuestionIndex } = useCase()
  const {rubricData} = useRubric();
  // Adding a hardcoded user score for demonstration - Need to redo so this is actually marked
  // const addMockUserScore = (rubric) => rubric.map(item => ({ ...item, userScore: Math.floor(Math.random() * 100) }));

  // const rubricWithUserScores = addMockUserScore(rubricCriteria);

  return (
    <div className="p-4 text-black dark:text-white">
      <h2 className="text-xl font-bold mb-2">Question {currentCase.questions[currentQuestionIndex].questionNumber}</h2>
      <p className="mb-4">{currentCase.questions[currentQuestionIndex]?.question}</p>
      <h3 className="text-lg font-semibold mb-3">Marking Criteria</h3>
      {rubricData[0].grade ? ( 
        <div>
          {rubricData.map((item: Rubric, index: number) => (
            <div key={index} className="mb-16">
              <div className="flex justify-between mb-1">
                <span className="font-medium">{item.criterion}</span>
                {/* <span className="font-medium">Weight: {item.weight * 100}%</span> */}
                <span className="font-medium">User Score: {rubricData[index].grade}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${rubricData[index].grade}%` }}></div>
              </div>
              <span className="font-medium text-icongray text-xs pb-10">{item.description}</span>

            </div>
          ))}
        </div>
      ):( 
      <div>
          Submit an answer to recieve feeback from agile AI!
      </div>
      
      )}
      
    </div>
  );
};

export default RubricComponent;