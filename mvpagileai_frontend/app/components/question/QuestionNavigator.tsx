"use client"
import { useCase } from "@/app/props/CaseProvider";
import React, { useEffect, useState } from "react";
import { FileText, ChevronLeft, ChevronRight, ChevronDown, RefreshCw, BookOpen, BarChart2 } from 'react-feather';


const QuestionNavigator = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const { setCurrentQuestionIndex, caseData, selectedView, setSelectedView} = useCase();
    const [caseIndex, setCaseIndex] = useState(0);

    
    const handleButtonSelect = (button: string) => {
        setSelectedView(button); // Set the selectedView based on the button clicked
    };

    // const handleNewCase = () => {
    //     if (caseIndex == casesData.length - 1) {
    //       setCaseIndex(0);
    //     } else {
    //       setCaseIndex((prev) => prev + 1);
    //     }
    //   };

    const handleNewQuestion = (change: number) => {
        setCurrentQuestionIndex((prevIndex: number) => {
            const newIndex = prevIndex + change;
            if (newIndex >= 0 && newIndex < caseData.questions.length) {
                return newIndex;
            }
            return prevIndex;
        });
    };

    useEffect(() => {
        console.log("Selected View Changed: ", selectedView);
    }, [selectedView]);

    return (
        <div className="flex items-center p-1 bg-gray-50 dark:bg-semidarkgray justify-between">
            {/* Left side buttons */}
            <div className="flex">
                {/* Problem button */}
                <button 
                    onClick={() => handleButtonSelect('problem')}
                    className={`flex items-center px-2 py-1 text-sm font-medium ${selectedView === 'problem' ? 'text-gray-500' : 'text-gray-500 opacity-60'}`}>
                    <FileText className="mr-2 w-4 h-4 text-blue-500" />
                    Problem
                </button>

                {/* Rubric button */}
                <button 
                    onClick={() => handleButtonSelect('rubric')}
                    className={`flex items-center px-2 py-1 text-sm font-medium ${selectedView === 'rubric' ? 'text-gray-500' : 'text-gray-500 opacity-60'}`}>
                    <BookOpen className="mr-2 w-4 h-4 text-blue-500" />
                    Rubric
                </button>

                {/* Problem Solving Framework button */}
                <button 
                    onClick={() => handleButtonSelect('framework')}
                    className={`flex items-center px-2 py-1 text-sm font-medium ${selectedView === 'framework' ? 'text-gray-500' : 'text-gray-500 opacity-60'}`}>
                    <BarChart2 className="mr-2 w-4 h-4 text-blue-500" />
                    Framework
                </button>
            </div>

            {/* Right side navigation arrows (existing code) */}

            {/* Navigation arrows */}
            <div className="ml-4 flex items-center">
                {/* Refresh button */}
                <button className="relative group p-2 cursor-pointer hover:bg-gray-300 hover:dark:bg-darkgray rounded transition-colors duration-300">
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
