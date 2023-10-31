import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'react-feather';

const SearchInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null); // Create a ref

  const handleInputFocus = () => {
    setIsFocused(true);
  }

  const handleKeyDown = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'j') {
      handleInputFocus();
      inputRef.current.focus(); // Set focus to the input element
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  return (
    <div className="relative w-72 rounded-md p-0.5 bg-gray-200">
      <div 
        className={`absolute px-4 left-6 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 pointer-events-none ${isFocused || inputValue ? 'hidden' : ''}`}
      >
        Type ⌘ + J to search job title
      </div>
      <input 
        ref={inputRef}  // Assign the ref to the input element
        type="text"
        className={`w-full py-1 px-10 text-sm bg-gray-200 text-gray-500 rounded-md transition-all duration-300 border-none focus:outline-none`}
        placeholder={isFocused || inputValue ? '' : ""}
        onFocus={handleInputFocus}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="absolute left-2 px-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
        <Search size={16} />
      </div>
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
        {isFocused ? '->' : null}
      </span>
    </div>
  );
}

export default SearchInput;
