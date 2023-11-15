import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'react-feather';
import { API_URL } from '../../../consts';
import { useCase } from '../props/CaseProvider';
import { getCase } from '@/datafetch';

const SearchInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const { setCaseData } = useCase();

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleSearchSubmit = async () => {
    const caseData = await getCase(inputValue);
    if (caseData) {
      setCaseData(caseData); // Update the global state with the fetched case data
      console.log("DATA: ", caseData)
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default form submission behavior
      handleSearchSubmit();
    } else if ((event.metaKey || event.ctrlKey) && event.key === 'j') {
      handleInputFocus();
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative w-72 rounded-md p-0.5 bg-gray-200 dark:bg-semidarkgray">
      <div 
        className={`absolute inset-y-0 left-8 text-sm text-icongray flex items-center pointer-events-none ${isFocused || inputValue ? 'hidden' : ''}`}
      >
        Type ⌘ + J to search job title
      </div>
      <input 
        ref={inputRef}
        type="text"
        className="w-full py-1 px-8 text-sm bg-gray-200 dark:bg-semidarkgray text-gray-200 dark:text-icongray rounded-md transition-all duration-300 border-none focus:outline-none"
        placeholder={isFocused || inputValue ? '' : ""}
        onFocus={handleInputFocus}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-2">
        <Search size={16} className="dark:text-icongray" />
      </div>
    </div>
  );
};

export default SearchInput;
