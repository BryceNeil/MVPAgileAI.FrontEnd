"use client"

import { useCase } from '@/app/props/CaseProvider';
import { useDashboard } from '@/app/props/DashboardProvider';
import { fetchCaseDataFromCaseId } from '@/datafetch';
import { useState } from 'react';
import {ChevronRight} from 'react-feather'

interface CaseCardProps {
    title: string
    caseId: string
    userId: string
}

  
const CaseCard: React.FC<CaseCardProps> = ({title, caseId, userId}) => {
    const [hovered, setHovered] = useState(false);
    const { setCurrentQuestionIndex } = useCase();
    const { caseData, setCaseData } = useCase();
    
    const {setDashboardVisible} = useDashboard();
    const fetchData = async() => {
        
        const prevCase = await fetchCaseDataFromCaseId(caseId, userId);
        console.log(prevCase)
        if (prevCase !== null && prevCase !== undefined) {
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
            setDashboardVisible(false)
            setCurrentQuestionIndex(0)
        } else {
            console.log('No case data found');
            // Handle the case when no data is found
        }
    } 
    return(
        <div className="h-20 w-full px-4 flex items-center hover:scale-[100.5%] transition-all duration-300"
        onClick={fetchData}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}>
            <div className="flex flex-row px-6 rounded-lg justify-between transition-all duration-300 items-center bg-gray-100 dark:hover:bg-darkestgray h-16 w-full">
                <div>
                    {title}
                </div>
                <div className="flex flex-row transition-all duration-300">
                    <div className="mr-6">
                        View
                    </div>
                    {hovered && <ChevronRight />}
                </div>
                
            </div>
        </div>
    )
}
export default CaseCard