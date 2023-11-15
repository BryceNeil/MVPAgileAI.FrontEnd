// QuestionComponent.jsx
import React, { useState, useEffect } from "react";
import ProblemComponent from "./blocks/ProblemComponent";
import RubricComponent from "./blocks/RubricComponent";
import FrameworkComponent from "./blocks/FrameworkComponent";
import QuestionNavigator from "./QuestionNavigator"; // Adjust the import path
import { useCase } from "../../props/CaseProvider";


const QuestionBox = () => {
  const { caseData, currentQuestionIndex, selectedView } = useCase();
  
  const currentQuestion = caseData?.questions?.[currentQuestionIndex];

  // ... existing states and functions ...

  return (
    <div className="bg-white dark:bg-darkgray rounded-lg flex flex-col relative flex-grow mt-4 px-4 h-full">
      {selectedView === 'problem' && <ProblemComponent currentQuestion={currentQuestion} />}
      {selectedView === 'rubric' && <RubricComponent currentQuestion={currentQuestion} />}
      {selectedView === 'framework' && <FrameworkComponent currentQuestion={currentQuestion} />}
      {/* ... remaining UI ... */}
    </div>
  );
};

export default QuestionBox;
