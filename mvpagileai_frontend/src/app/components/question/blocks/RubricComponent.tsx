import React from 'react';

const RubricComponent = ({ caseData, currentQuestion, currentQuestionIndex }) => {
  // Accessing the rubric for the current question
  const currentQuestionRubric = caseData?.rubric?.find(rubric => rubric.questionNumber === currentQuestion?.questionNumber) || [];
  const rubricCriteria = currentQuestion?.rubric || [];

  // Adding a hardcoded user score for demonstration - Need to redo so this is actually marked
  const addMockUserScore = (rubric) => rubric.map(item => ({ ...item, userScore: Math.floor(Math.random() * 100) }));

  const rubricWithUserScores = addMockUserScore(rubricCriteria);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Question {currentQuestion?.questionNumber}</h2>
      <p className="mb-4">{currentQuestion?.question}</p>
      <h3 className="text-lg font-semibold mb-3">Marking Criteria</h3>
      <div>
        {rubricWithUserScores.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="font-medium">{item.criterion}</span>
              {/* <span className="font-medium">Weight: {item.weight * 100}%</span> */}
              <span className="font-medium">User Score: {item.userScore}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${item.userScore}%` }}></div>
            </div>
            <span className="font-medium text-icongray text-xs pb-10">{item.description}</span>

          </div>
        ))}
      </div>
    </div>
  );
};

export default RubricComponent;
