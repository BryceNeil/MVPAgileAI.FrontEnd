import React from 'react';

const FrameworkComponent = ({ caseData, currentQuestion, currentQuestionIndex }) => {
  // Accessing the framework for the current question
  const currentQuestionFramework = currentQuestion?.framework;

  if (!currentQuestionFramework) {
    return <p>No framework data available for this question.</p>;
  }

  const { overview, steps } = currentQuestionFramework;

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-3">Problem Solving Framework for Question {currentQuestion?.questionNumber}</h3>
      <p className="mb-4">{currentQuestionFramework?.overview}</p>
      <ol className="list-decimal pl-6">
        {currentQuestionFramework?.steps.map((step, index) => (
          <li key={index} className="mb-3">
            <p className="font-semibold">Step {step.stepNumber}: {step.description}</p>
            <p>{step.details}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default FrameworkComponent;
