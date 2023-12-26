import { enterNewCase, fetchCaseData, getCase } from '@/datafetch';
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
  const { setCaseData, caseData } = useCase()

  const handleInputFocus = () => {
    setIsFocused(true);
  }


  useEffect(() => {
    const fetchData = async () => {
        try {
            const prevCase = await fetchCaseData(userId); // Wait for the promise to resolve
            console.log(prevCase);

            if (prevCase) {
                const transformedData = {
                    jobTitle: prevCase[0].title || '',
                    scenario: prevCase[0].description || '',
                    caseId: prevCase[0].case_id || '',
                    questions: [
                      {
                        questionNumber: 1,
                        questionId: prevCase[0].question_id || '',
                        question: prevCase[0].question || '',
                        difficultyLevel: prevCase[0].difficultylevel || '',
                        framework: {
                          overview: prevCase[0].fr_overview || '',
                          steps: [{
                              stepNumber: prevCase[0].step_number,
                              description: prevCase[0].description || '',
                              details: prevCase[0].details || '',
                          },
                          {
                            stepNumber: prevCase[1].step_number,
                            description: prevCase[1].description || '',
                            details: prevCase[1].details || '',
                          }
                        ]
                        }
                        
                    },
                    {
                        questionNumber: 2,
                        questionId: prevCase[3].question_id || '',
                        question: prevCase[3].question || '',
                        difficultyLevel: prevCase[3].difficultylevel || '',
                        framework: {
                          overview: prevCase[3].fr_overview || '',
                          steps: [{
                            stepNumber: prevCase[3].step_number,
                            description: prevCase[3].description || '',
                            details: prevCase[3].details || '',
                          },
                          {
                            stepNumber: prevCase[4].step_number,
                            description: prevCase[4].description || '',
                            details: prevCase[4].details || '',
                          },
                        ]
                        }
                    },
                    {
                        questionNumber: 3,
                        questionId: prevCase[6].question_id || '',
                        question: prevCase[6].question || '',
                        difficultyLevel: prevCase[6].difficultylevel || '',
                        framework: {
                          overview: prevCase[6].fr_overview || '',
                          steps: [{
                            stepNumber: prevCase[6].step_number,
                            description: prevCase[6].description || '',
                            details: prevCase[6].details || '',
                          },
                          {
                            stepNumber: prevCase[7].step_number,
                            description: prevCase[7].description || '',
                            details: prevCase[7].details || '',
                          }
                        ]
                        }
                    },
                    {
                        questionNumber: 4,
                        questionId: prevCase[9].question_id || '',
                        question: prevCase[9].question || '',
                        difficultyLevel: prevCase[9].difficultylevel || '',
                        framework: {
                          overview: prevCase[9].fr_overview || '',
                          steps: [{
                            stepNumber: prevCase[9].step_number,
                            description: prevCase[9].description || '',
                            details: prevCase[9].details || '',
                          },
                          {
                            stepNumber: prevCase[10].step_number,
                            description: prevCase[10].description || '',
                            details: prevCase[10].details || '',
                          }
                        ]
                        }
                    },
                    {
                        questionNumber: 5,
                        questionId: prevCase[12].question_id || '',
                        question: prevCase[12].question || '',
                        difficultyLevel: prevCase[12].difficultylevel || '',
                        framework: {
                          overview: prevCase[12].fr_overview || '',
                          steps: [{
                            stepNumber: prevCase[12].step_number,
                            description: prevCase[12].description || '',
                            details: prevCase[12].details || '',
                          },
                          {
                            stepNumber: prevCase[13].step_number,
                            description: prevCase[13].description || '',
                            details: prevCase[13].details || '',
                          }
                        ]
                        }
                    },
                    ]
                };

                setCaseData(transformedData);
            } else {
                console.log('No case data found');
                // Handle the case when no data is found
            }
        } catch (error) {
            console.error('Error fetching case data:', error);
        }
    };

    fetchData();
}, [userId]); // Include caseData in the dependency array

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
