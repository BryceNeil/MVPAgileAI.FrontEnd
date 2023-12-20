"use client"
import React, { useState } from "react";
import InterviewAILogo from "../chat/InterviewAILogo";
import InterviewBody from "../chat/InterviewBody";
import { useQuery } from "@tanstack/react-query";
import { getCaseQuestions, getCases } from "@/datafetch";
import { User } from "@/app/types";
import { useCase } from "@/app/props/CaseProvider";

interface InterviewProps {
    authProfile: User
    accessToken?: string | undefined
}

const Interview: React.FC<InterviewProps> = ({authProfile, accessToken}) => {
    
    const [leftSize, setLeftSize] = useState(70);
    const [selectedBox, setSelectedBox] = useState<number | null>(null); // State to keep track of the selected box
    const [caseIndex, setCaseIndex] = useState(0);
    const { caseData, currentQuestionIndex} = useCase();

    console.log(caseData)
    return (
        <div className="flex flex-col flex-grow" style={{ flexBasis: `${100 - leftSize}%` }}>
          {/* Box 3 */}
          <div className={`flex bg-white dark:bg-darkgray rounded-lg  h-full overflow-hidden w-full  ${selectedBox === 3 ? "border border-gray-200 dark:border-medgray" : ""}`} onClick={() => setSelectedBox(3)}>
            <div className="flex flex-col h-full w-full rounded-lg overflow-hidden ">
              <div className="text-center p-2 py-3 bg-gray-50 dark:bg-semidarkgray">
                <InterviewAILogo />
              </div>
              <div className="h-[800px] p-0 w-full">
                {caseData?.questions && caseData?.questions.length > 0 && authProfile ? (
                  <InterviewBody
                    questionId={caseData.questions[currentQuestionIndex].questionId}
                    userId={authProfile.user_id}
                    token={accessToken}
                    userInitial={authProfile.email.charAt(0)}
                  />
                ) : (
                  <div className="w-full flex mt-24 flex-col items-center text-gray-500 dark:text-gray-400">
                    AgileAI will be here when you search your dream job
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
    )
}

export default Interview