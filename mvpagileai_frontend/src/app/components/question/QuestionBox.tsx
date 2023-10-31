import React from 'react';

const QuestionComponent = ({ title, difficulty, skills, description, examples, constraints }) => {
    return (
        <div className="bg-white rounded-lg p-4">
            <h1 className="text-black text-xl font-bold mb-2">{title}</h1>

            <div className="mb-4 flex space-x-2">
                <span className="bg-blue-100 text-blue-500 text-xs rounded-full px-3 py-1">{difficulty}</span>
                {skills.map(skill => (
                    <span key={skill} className="bg-gray-200 text-gray-800 text-xs rounded-full px-3 py-1">{skill}</span>
                ))}
            </div>

            <p className="text-gray-300 text-sm mb-4">{description}</p>

            {examples.map((example, index) => (
                <div key={index} className="mb-4 text-sm">
                    <p className="text-black font-semibold mb-2">{`Example ${index + 1} :`}</p>
                    <p className="font-mono"><span className="text-black">Input:</span> <span className="text-gray-300">{example.input}</span></p>
                    <p className="font-mono mt-2"><span className="text-black">Output:</span> <span className="text-gray-300">{example.output}</span></p>
                </div>
            
            ))}

            <p className="text-gray-300 mt-2">{`Constraints: ${constraints}`}</p>
        </div>
    );
};

const QuestionBox = () => {
    const questionData = {
        title: "215. Kth Largest Element in an Array",
        difficulty: "Medium",
        skills: ["Topics", "Companies"],
        description: "Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element. Can you solve it without sorting?",
        examples: [
            {
                input: "nums = [3,2,1,5,6,4], k = 2",
                output: "5"
            },
            {
                input: "nums = [3,2,3,1,2,4,5,5,6], k = 4",
                output: "4"
            }
        ],
        constraints: "1 <= k <= nums.length <= 10^5"
    };

    return (
            <QuestionComponent {...questionData} />
    );
};

export default QuestionBox;
