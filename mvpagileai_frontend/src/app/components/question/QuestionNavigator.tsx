import React, { useState } from "react";
import { FileText, ChevronLeft, ChevronRight, ChevronDown, RefreshCw } from 'react-feather';

const QuestionNavigator = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState('Financial Modelling');

    const categories = ['Financial Modelling', 'Category 1', 'Category 2']; // List of all categories

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    }

    const changeCategory = (newCategory) => {
        setCurrentCategory(newCategory);
        toggleDropdown();
    }

    return (
        <div className="flex items-center p-1 bg-gray-50 dark:bg-semidarkgray justify-between">
          {/* Description button with dropdown */}
          <div className="relative z-10">
            <button className="flex text-gray-900 dark:text-gray-300 font-semibold text-xs items-center ml-2" onClick={toggleDropdown}>
              <FileText className="w-4 h-4 mr-2" color="#3498db" />
              {currentCategory}
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            
            {/* Dropdown menu */}
            {isDropdownOpen && (
            <div className="absolute text-gray-900 dark:text-gray-300 text-xs mt-2 w-56 left-0 bg-gray-50 dark:bg-darkgray shadow-xl rounded">
                {categories.map((category, index) => (
                <button 
                    key={category}
                    className={`
                    flex items-center w-full p-2
                    ${category === currentCategory ? 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}
                    ${index === 0 ? 'rounded-t' : ''} 
                    ${index === categories.length - 1 ? 'rounded-b' : ''}
                    `}
                    onClick={() => changeCategory(category)}
                >
                    <FileText className="w-4 h-4 mr-2" color="#3498db" />
                    {category}
                </button>
                ))}
            </div>
            )}
          </div>
      
          {/* Navigation arrows */}
          <div className="ml-4 flex items-center">
            {/* Refresh button */}
            <div className="relative group p-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-darkgray rounded transition-colors duration-300">
              <RefreshCw className="text-gray-600 dark:text-icongray w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 text-xs bg-black dark:bg-gray-700 text-white dark:text-gray-300 p-1 mt-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                New {currentCategory} Question
              </div>
            </div>
      
            {/* Previous arrow */}
            <div className="relative group p-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-darkgray rounded transition-colors duration-300">
              <ChevronLeft className="text-gray-600 dark:text-icongray w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 text-xs bg-black dark:bg-gray-700 text-white dark:text-gray-300 p-1 mt-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                Previous Question
              </div>
            </div>
      
            {/* Next arrow */}
            <div className="relative group p-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-darkgray rounded transition-colors duration-300">
              <ChevronRight className="text-gray-600 dark:text-icongray w-4 h-4" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 text-xs bg-black dark:bg-gray-700 text-white dark:text-gray-300 p-1 mt-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                Next Question
              </div>
            </div>
          </div>
        </div>
      );      
};

export default QuestionNavigator;
