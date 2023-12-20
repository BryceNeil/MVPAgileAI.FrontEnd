import { useCase } from '@/app/props/CaseProvider';
import React from 'react';
import { CaseData } from '@/app/types'

interface FrameworkBlockProps{
  currentCase: CaseData
}

const FrameworkBlock: React.FC<FrameworkBlockProps> = ({ currentCase }) => {
  const { currentQuestionIndex } = useCase()
   // Accessing the framework for the current question
   const currentQuestionFramework = currentCase.questions[currentQuestionIndex].framework;

   if (!currentQuestionFramework) {
     return <p className="text-black dark:text-gray-50">No framework data available for this question.</p>;

   }
 
   
   const { overview, steps } = currentQuestionFramework;
 
   return (
     <div className="p-4 text-black dark:text-gray-50">
       <h3 className="text-lg font-semibold mb-3">Problem Solving Framework for Question {currentCase.questions[currentQuestionIndex].questionNumber}</h3>
       <div className="pb-10">
          {currentCase.questions[currentQuestionIndex] && (
              <span className="text-black dark:text-gray-50"><b>Question: </b>{currentCase.questions[currentQuestionIndex].question}</span>
            )}
       </div>
       <p className="mb-10">{overview}</p>
       <ol className="list-decimal pl-6">
         {steps.map((step, index) => (
           <li key={index} className="mb-3">
             <p className="font-semibold">Step {step.stepNumber}: {step.description}</p>
             <p className="text-gray-500 dark:text-gray-400 text-sm mb-10">{step.details}</p>
           </li>
         ))}
       </ol>
       
     </div>
   );
 };
 
 export default FrameworkBlock;
 