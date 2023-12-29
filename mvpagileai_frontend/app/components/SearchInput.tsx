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
                        questionId: prevCase[0].question_ids[0] || '',
                        question: prevCase[0].questions[0] || '',
                        difficultyLevel: prevCase[0].difficulty_levels[0] || '',
                        framework: {
                          overview: prevCase[0].fr_overviews[0] || '',
                          steps: [
                            {
                              stepNumber: 1,
                              description: prevCase[0].framework_steps[0][1],
                              details: prevCase[0].framework_steps[0][2]
                            },
                            {
                              stepNumber: 2,
                              description: prevCase[0].framework_steps[1][1],
                              details: prevCase[0].framework_steps[1][2]
                            },
                            {
                              stepNumber: 3,
                              description: prevCase[0].framework_steps[2][1],
                              details: prevCase[0].framework_steps[2][2]
                            },

                          ]
                        },
                        rubric: [
                          {
                            criterion: prevCase[0].rubric_criteria[0][0],
                            description: prevCase[0].rubric_criteria[0][1],
                            weight: prevCase[0].rubric_criteria[0][2],
                            grade: prevCase[0].rubric_criteria[0][3]
                          },
                          {
                            criterion: prevCase[0].rubric_criteria[1][0],
                            description: prevCase[0].rubric_criteria[1][1],
                            weight: prevCase[0].rubric_criteria[1][2],
                            grade: prevCase[0].rubric_criteria[1][3]
                          },
                          {
                            criterion: prevCase[0].rubric_criteria[2][0],
                            description: prevCase[0].rubric_criteria[2][1],
                            weight: prevCase[0].rubric_criteria[2][2],
                            grade: prevCase[0].rubric_criteria[2][3]
                          },
                        ] 
                      },
                      {
                        questionNumber: 2,
                        questionId: prevCase[1].question_ids[0] || '',
                        question: prevCase[1].questions[0] || '',
                        difficultyLevel: prevCase[1].difficulty_levels[0] || '',
                        framework: {
                          overview: prevCase[1].fr_overviews[0] || '',
                          steps: [
                            {
                              stepNumber: 1,
                              description: prevCase[1].framework_steps[0][1],
                              details: prevCase[1].framework_steps[0][2]
                            },
                            {
                              stepNumber: 2,
                              description: prevCase[1].framework_steps[1][1],
                              details: prevCase[1].framework_steps[1][2]
                            },
                            {
                              stepNumber: 3,
                              description: prevCase[1].framework_steps[2][1],
                              details: prevCase[1].framework_steps[2][2]
                            },

                          ]
                        },
                        rubric: [
                          {
                            criterion: prevCase[1].rubric_criteria[0][0],
                            description: prevCase[1].rubric_criteria[0][1],
                            weight: prevCase[1].rubric_criteria[0][2],
                            grade: prevCase[1].rubric_criteria[0][3]
                          },
                          {
                            criterion: prevCase[1].rubric_criteria[1][0],
                            description: prevCase[1].rubric_criteria[1][1],
                            weight: prevCase[1].rubric_criteria[1][2],
                            grade: prevCase[1].rubric_criteria[1][3]
                          },
                          {
                            criterion: prevCase[1].rubric_criteria[2][0],
                            description: prevCase[1].rubric_criteria[2][1],
                            weight: prevCase[1].rubric_criteria[2][2],
                            grade: prevCase[1].rubric_criteria[2][3]
                          },
                        ] 
                      },
                      {
                        questionNumber: 3,
                        questionId: prevCase[2].question_ids[0] || '',
                        question: prevCase[2].questions[0] || '',
                        difficultyLevel: prevCase[2].difficulty_levels[0] || '',
                        framework: {
                          overview: prevCase[2].fr_overviews[0] || '',
                          steps: [
                            {
                              stepNumber: 1,
                              description: prevCase[2].framework_steps[0][1],
                              details: prevCase[2].framework_steps[0][2]
                            },
                            {
                              stepNumber: 2,
                              description: prevCase[2].framework_steps[1][1],
                              details: prevCase[2].framework_steps[1][2]
                            },
                            {
                              stepNumber: 3,
                              description: prevCase[2].framework_steps[2][1],
                              details: prevCase[2].framework_steps[2][2]
                            },

                          ]
                        },
                        rubric: [
                          {
                            criterion: prevCase[2].rubric_criteria[0][0],
                            description: prevCase[2].rubric_criteria[0][1],
                            weight: prevCase[2].rubric_criteria[0][2],
                            grade: prevCase[2].rubric_criteria[0][3]
                          },
                          {
                            criterion: prevCase[2].rubric_criteria[1][0],
                            description: prevCase[2].rubric_criteria[1][1],
                            weight: prevCase[2].rubric_criteria[1][2],
                            grade: prevCase[2].rubric_criteria[1][3]
                          },
                          {
                            criterion: prevCase[2].rubric_criteria[2][0],
                            description: prevCase[2].rubric_criteria[2][1],
                            weight: prevCase[2].rubric_criteria[2][2],
                            grade: prevCase[2].rubric_criteria[2][3]
                          },
                        ] 
                      },
                      {
                        questionNumber: 4,
                        questionId: prevCase[3].question_ids[0] || '',
                        question: prevCase[3].questions[0] || '',
                        difficultyLevel: prevCase[3].difficulty_levels[0] || '',
                        framework: {
                          overview: prevCase[3].fr_overviews[0] || '',
                          steps: [
                            {
                              stepNumber: 1,
                              description: prevCase[3].framework_steps[0][1],
                              details: prevCase[3].framework_steps[0][2]
                            },
                            {
                              stepNumber: 2,
                              description: prevCase[3].framework_steps[1][1],
                              details: prevCase[3].framework_steps[1][2]
                            },
                            {
                              stepNumber: 3,
                              description: prevCase[3].framework_steps[2][1],
                              details: prevCase[3].framework_steps[2][2]
                            },

                          ]
                        },
                        rubric: [
                          {
                            criterion: prevCase[3].rubric_criteria[0][0],
                            description: prevCase[3].rubric_criteria[0][1],
                            weight: prevCase[3].rubric_criteria[0][2],
                            grade: prevCase[3].rubric_criteria[0][3]
                          },
                          {
                            criterion: prevCase[3].rubric_criteria[1][0],
                            description: prevCase[3].rubric_criteria[1][1],
                            weight: prevCase[3].rubric_criteria[1][2],
                            grade: prevCase[3].rubric_criteria[1][3]
                          },
                          {
                            criterion: prevCase[3].rubric_criteria[2][0],
                            description: prevCase[3].rubric_criteria[2][1],
                            weight: prevCase[3].rubric_criteria[2][2],
                            grade: prevCase[3].rubric_criteria[2][3]
                          },
                        ] 
                      },
                      {
                        questionNumber: 5,
                        questionId: prevCase[4].question_ids[0] || '',
                        question: prevCase[4].questions[0] || '',
                        difficultyLevel: prevCase[4].difficulty_levels[0] || '',
                        framework: {
                          overview: prevCase[4].fr_overviews[0] || '',
                          steps: [
                            {
                              stepNumber: 1,
                              description: prevCase[4].framework_steps[0][1],
                              details: prevCase[4].framework_steps[0][2]
                            },
                            {
                              stepNumber: 2,
                              description: prevCase[4].framework_steps[1][1],
                              details: prevCase[4].framework_steps[1][2]
                            },
                            {
                              stepNumber: 3,
                              description: prevCase[4].framework_steps[2][1],
                              details: prevCase[4].framework_steps[2][2]
                            },

                          ]
                        },
                        rubric: [
                          {
                            criterion: prevCase[4].rubric_criteria[0][0],
                            description: prevCase[4].rubric_criteria[0][1],
                            weight: prevCase[4].rubric_criteria[0][2],
                            grade: prevCase[4].rubric_criteria[0][3]
                          },
                          {
                            criterion: prevCase[4].rubric_criteria[1][0],
                            description: prevCase[4].rubric_criteria[1][1],
                            weight: prevCase[4].rubric_criteria[1][2],
                            grade: prevCase[4].rubric_criteria[1][3]
                          },
                          {
                            criterion: prevCase[4].rubric_criteria[2][0],
                            description: prevCase[4].rubric_criteria[2][1],
                            weight: prevCase[4].rubric_criteria[2][2],
                            grade: prevCase[4].rubric_criteria[2][3]
                          },
                        ] 
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
