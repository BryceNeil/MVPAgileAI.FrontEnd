// import React, { useState } from 'react';
// import MonacoEditor from 'react-monaco-editor';
// import { ChevronDown, Lock, Unlock, RefreshCw } from 'react-feather';

// const CodeWorkspace: React.FC = () => {
//   const [code, setCode] = useState("// Your code here \n");
//   const [language, setLanguage] = useState("python");
//   const [autoComplete, setAutoComplete] = useState(true);
//   const [showDropdown, setShowDropdown] = useState(false);

//   const languages = ["python", "javascript", "typescript", "java", "c#", "ruby"]; // Example languages

//   const options = {
//     selectOnLineNumbers: true,
//     quickSuggestions: {
//       other: autoComplete,
//       comments: autoComplete,
//       strings: autoComplete,
//     },
//     parameterHints: {
//       enabled: autoComplete
//     },
//     suggestOnTriggerCharacters: autoComplete,
//     tabCompletion: autoComplete ? 'on' : 'off', // 'on', 'off', or 'onlySnippets'
//     wordBasedSuggestions: autoComplete,
//     acceptSuggestionOnEnter: autoComplete ? 'on' : 'off',
//     // ... (other options)
//   };
  

//   const handleLanguageChange = (newLanguage) => {
//     setLanguage(newLanguage);
//     setShowDropdown(false); // Hide dropdown after selection
//   };

//   const handleAutoCompleteToggle = () => {
//     setAutoComplete(!autoComplete);
//   };

//   const handleRefresh = () => {
//     setCode("// Your code here \n"); // Reset to default code
//   };

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   return (
//     <div className="h-full w-full flex flex-col text-xs">
//       <div className="flex items-center justify-between p-2 bg-gray-50">
//         <button onClick={toggleDropdown} className="flex items-center space-x-2">
//           <span className="text-gray-500">{language}</span>
//           <ChevronDown className="text-gray-500" size={10} />
//           {showDropdown && (
//             <div className="absolute mt-1 bg-white border border-gray-200 rounded shadow-lg">
//               {languages.map((lang) => (
//                 <div key={lang} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleLanguageChange(lang)}>
//                   {lang}
//                 </div>
//               ))}
//             </div>
//           )}
//         </button>
//         <button onClick={handleAutoCompleteToggle} className="flex items-center text-gray-500 space-x-2">
//           {autoComplete ? <Unlock size={14}/> : <Lock size={14}/>}
//           <span>Auto</span>
//         </button>
//         <button onClick={handleRefresh} className='text-gray-500'>
//           <RefreshCw size={14} />
//         </button>
//       </div>
//       <MonacoEditor
//         width="100%"
//         height="100%"
//         language={language} // Set language from state
//         theme="vs-light"
//         value={code}
//         options={options}
//         onChange={(newValue, e) => setCode(newValue)}
//       />
//     </div>
//   );
// };

// export default CodeWorkspace;
