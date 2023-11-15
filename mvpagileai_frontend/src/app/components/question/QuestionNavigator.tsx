import React, { useState } from "react";
import { FileText, BookOpen, BarChart2, ChevronLeft, ChevronRight, RefreshCw } from 'react-feather';
import { useCase } from "../../props/CaseProvider";

interface QuestionNavigatorProps {
    handleNewCase: () => void
    handleNewQuestion: (change: number) => void
}
const QuestionNavigator = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const { setCurrentQuestionIndex, caseData, selectedView, setSelectedView } = useCase();

    // Function to handle button selection
    const handleButtonSelect = (button) => {
        setSelectedView(button);
        // Additional logic for each button can be added here
    };

    const handleNewQuestion = (change) => {
        setCurrentQuestionIndex((prevIndex) => {
            const newIndex = prevIndex + change;
            if (newIndex >= 0 && newIndex < caseData.questions.length) {
                return newIndex;
            }
            return prevIndex;
        });
    };

    return (
        <div className="flex items-center p-1 bg-gray-50 dark:bg-semidarkgray justify-between">
            {/* Left side buttons */}
            <div className="flex">
                {/* Problem button */}
                <button 
                    onClick={() => handleButtonSelect('problem')}
                    className={`flex items-center px-2 py-1 text-sm font-medium ${selectedView === 'problem' ? 'opacity-100' : 'text-gray-500 opacity-60'}`}>
                    <FileText className="mr-2 w-4 h-4 text-blue-500" />
                    Problem
                </button>

                {/* Rubric button */}
                <button 
                    onClick={() => handleButtonSelect('rubric')}
                    className={`flex items-center px-2 py-1 text-sm font-medium ${selectedView === 'rubric' ? 'opacity-100' : 'text-gray-500 opacity-60'}`}>
                    <BookOpen className="mr-2 w-4 h-4 text-blue-500" />
                    Rubric
                </button>

                {/* Problem Solving Framework button */}
                <button 
                    onClick={() => handleButtonSelect('framework')}
                    className={`flex items-center px-2 py-1 text-sm font-medium ${selectedView === 'framework' ? 'opacity-100' : 'text-gray-500 opacity-60'}`}>
                    <BarChart2 className="mr-2 w-4 h-4 text-blue-500" />
                    Framework
                </button>
            </div>

            {/* Right side navigation arrows (existing code) */}

            {/* Navigation arrows */}
            <div className="ml-4 flex items-center">
                {/* Refresh button */}
                <button onClick={()=>handleNewQuestion(+1)}className="relative group p-2 cursor-pointer hover:bg-gray-300 hover:dark:bg-darkgray rounded transition-colors duration-300">
                    <RefreshCw className="text-gray-600 dark:text-icongray w-4 h-4" />
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 text-xs bg-black text-white p-1 mt-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                        New Case
                    </div>
                </button>

                {/* Previous arrow */}
                <button onClick={()=>handleNewQuestion(-1)}className="relative group p-2 cursor-pointer hover:bg-gray-300 hover:dark:bg-darkgray rounded transition-colors duration-300">
                    <ChevronLeft className="text-gray-600 dark:text-icongray w-4 h-4" />
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 text-xs bg-black text-white p-1 mt-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                        Previous Question
                    </div>
                </button>

                {/* Next arrow */}
                <button onClick={()=>handleNewQuestion(1)} className="relative group p-2 cursor-pointer hover:bg-gray-300 hover:dark:bg-darkgray rounded transition-colors duration-300">
                    <ChevronRight className="text-gray-600 dark:text-icongray w-4 h-4" />
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 text-xs bg-black text-white p-1 mt-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                        Next Question
                    </div>
                </button>
            </div>
        </div>
      );      
};

export default QuestionNavigator;
