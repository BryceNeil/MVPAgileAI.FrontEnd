import { useCase } from '@/app/props/CaseProvider';
import { useRubric } from '@/app/props/RubricProvider';
import { CaseData, Rubric } from '@/app/types';
import React, { useState } from 'react';


interface RubricComponentsProps {
  currentCase: CaseData

}
  
const RubricComponent: React.FC<RubricComponentsProps> = ({ currentCase }) => {
  // Accessing the rubric for the current question
  const { currentQuestionIndex, caseData } = useCase()
  const { rubricData } = useRubric();
  console.log(rubricData)
  console.log(currentQuestionIndex)
  console.log(caseData.questions[currentQuestionIndex].rubric[0].grade)
  return (
    <div className="p-4 text-black dark:text-white">
      <h2 className="text-xl font-bold mb-2">Question {caseData.questions[currentQuestionIndex].questionNumber}</h2>
      <p className="mb-4">{caseData.questions[currentQuestionIndex]?.question}</p>
      <h3 className="text-lg font-semibold mb-3">Marking Criteria</h3>
      {caseData.questions[currentQuestionIndex].rubric[0].grade !== null && caseData.questions[currentQuestionIndex].rubric[0].grade !== undefined ? ( 
        <div>
          {caseData.questions[currentQuestionIndex].rubric.map((item: Rubric, index: number) => (
            <div key={index} className="mb-16">
              <div className="flex justify-between mb-1">
                <span className="font-medium">{item.criterion}</span>
                {/* <span className="font-medium">Weight: {item.weight * 100}%</span> */}
                <span className="font-medium">User Score: {item.grade}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${item.grade}%` }}></div>
              </div>
              <span className="font-medium text-icongray text-xs pb-10">{item.description}</span>

            </div>
          ))}
        </div>
      ):( 
        <div>
        {rubricData[currentQuestionIndex][0].grade != null ? (
          <div>
          {rubricData[currentQuestionIndex].map((item: Rubric, index: number) => (
            <div key={index} className="mb-16">
              <div className="flex justify-between mb-1">
                <span className="font-medium">{item.criterion}</span>
                {/* <span className="font-medium">Weight: {item.weight * 100}%</span> */}
                <span className="font-medium">User Score: {item.grade}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${item.grade}%` }}></div>
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
      )}
      
    </div>
  );
};

export default RubricComponent;