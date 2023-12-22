import { enterNewCase, getCase } from '@/datafetch';
import React, { useState, useEffect, useRef, } from 'react';
import { Search } from 'react-feather';
import { useCase } from '../props/CaseProvider';
import Loader from '@/app/components/Loader'
import { useLoader } from '../props/LoadProvider';
import { CaseData } from '../types';

interface SearchInputProps {
  userId?: string
}
const SearchInput: React.FC<SearchInputProps> = ({userId}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { isLoading, setIsLoading } = useLoader();
  const inputRef = useRef<HTMLInputElement>(null);
  const { setCaseData } = useCase()

  const handleInputFocus = () => {
    setIsFocused(true);
  }

  const enterCaseData = async (caseData: CaseData, userId?: string) => {
    return await enterNewCase(caseData, userId)
  }

  const updateDataWithIds = (caseData:CaseData, ids: any) => {
    const caseId = ids[0];
    caseData.caseId = caseId
    caseData.questions.forEach((question, index) => {
      question.questionId = ids[1][index]; // Assuming the rest of the IDs correspond to questions
    });
    return caseData
  }

  const handleSearchSubmit = async () => {
    setIsLoading(true); // Set loading to true when starting the search
    try {
      const caseData = await getCase(inputValue);
      if (caseData) {
        const ids = await enterCaseData(caseData, userId);
        const caseDataComp = updateDataWithIds(caseData, ids)
        setCaseData(caseDataComp);
      }
    } catch (error) {
      console.error("Error fetching case:", error);
    } finally {
      setIsLoading(false); // Set loading o false when search completes (success or failure)
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default form submission behavior
      handleSearchSubmit();
    } else if ((event.metaKey || event.ctrlKey) && event.key === 'j') {
      handleInputFocus();
  }}

  

  return (
    <div className="relative w-auto lg:w-72 rounded-md p-0.5 ml-2 bg-gray-200 dark:bg-semidarkgray cursor-pointer">
      <input 
        ref={inputRef}
        type="text"
        className={`w-[90%] py-1 pl-10 text-sm bg-gray-200 dark:bg-semidarkgray text-gray-500 dark:text-icongray rounded-md transition-all duration-300 border-none focus:outline-none`}
        placeholder={"Type ⌘ + J to search job title"}
        onFocus={handleInputFocus}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="absolute left-2 px-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-icongray pointer-events-none">
        <Search size={16} />
      </div>
      <button onClick={handleSearchSubmit} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-icongray" >
        {isLoading ? <Loader size={15} /> : '\u2934'}
      </button>
    </div>
  );
}

export default SearchInput;
