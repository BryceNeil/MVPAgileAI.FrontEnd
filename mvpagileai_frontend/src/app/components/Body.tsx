"use client";
import React, { useEffect, useState } from "react";
import InterviewAILogo from "./chat/InterviewAILogo";
import WorkspaceSelection from "./workspace/WorkspaceSelection";
import QuestionNavigator from "./question/QuestionNavigator";
import QuestionBox from "./question/QuestionBox";
// import CodeWorkspace from "./workspace/CodeWorkspace";
import WhiteboardWorkspace from "./workspace/WhiteboardWorkspace";
// import TablesWorkspace from "./workspace/TablesWorkspace";
// import Plugins from "./workspace/Plugins";
import InterviewBody from "./chat/InterviewBody";
import { useQuery } from "@tanstack/react-query";
import { getCaseQuestions, getCases, getUserProfile, token } from "@/datafetch";
import { useRouter } from "next/navigation";

interface BodyProps {
  isLoggedIn: boolean;
}

const mapIdToWorkspace = (id: number) => {
  switch (id) {
    case 1:
      return "Tables";
    case 2:
      return "Whiteboard";
    case 3:
      return "Code";
    case 4:
      return "Plugins";
    default:
      return null;
  }
};

const Body: React.FC<BodyProps> = ({isLoggedIn}) => {
  /* Check logged in */
  const router = useRouter();
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem("accessToken") || '' : undefined;
  const { data: authProfile, isSuccess } = useQuery({
    queryKey: ["auth"],
    queryFn: () => getUserProfile(accessToken),
  });

  const [leftSize, setLeftSize] = useState(70);
  const [bottomSize, setBottomSize] = useState(33); // Changed the initial valu to 33 for equal distribution
  const [isResizing, setIsResizing] = useState<number | null>(null);
  const [selectedBox, setSelectedBox] = useState<number | null>(null); // State to keep track of the selected box
  const [selectedId, setSelectedId] = useState(2);
  const [caseIndex, setCaseIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const selectedWorkspace = mapIdToWorkspace(selectedId ?? 2);

  /* Data fetching */

  const { data: casesData, refetch } = useQuery({
    queryKey: ["cases"],
    queryFn: getCases,
  });

  const { data: questionsData, refetch: refetchQuestions } = useQuery({
    queryKey: ["questions", caseIndex],
    queryFn: () => getCaseQuestions(casesData[caseIndex].caseId),
    enabled: casesData != undefined && casesData != null,
  });

  const handleNewCase = () => {
    if (caseIndex == casesData.length - 1) {
      setCaseIndex(0);
    } else {
      setCaseIndex((prev) => prev + 1);
    }
  };
  const handleNewQuestion = (change: number) => {
    const newIndex = currentQuestionIndex + change;
    console.log(newIndex);
    if (newIndex < 0) {
      setCurrentQuestionIndex(0);
    } else if (newIndex >= questionsData.length) {
      setCurrentQuestionIndex(questionsData.length - 1);
    } else {
      setCurrentQuestionIndex(newIndex);
    }
  };    const NavbarHeight = '64px'; // Replace with the actual height of your navbar


  const handleMouseMove = (e: any) => {
    if (isResizing === 1) {
      let newLeftSize = (e.clientX / window.innerWidth) * 100;
      if (newLeftSize < 10) newLeftSize = 10;
      if (newLeftSize > 90) newLeftSize = 90;
      setLeftSize(newLeftSize);
    } else if (isResizing === 2) {
      let newBottomSize = 100 - (e.clientY / window.innerHeight) * 100; // This will make the box bigger when you drag upwards and smaller when you drag downwards
      if (newBottomSize < 10) newBottomSize = 10;
      if (newBottomSize > 90) newBottomSize = 90;
      setBottomSize(newBottomSize);
    }
  };

  return (
    <div
      className="flex flex-grow p-0 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsResizing(null)}
    >
      <div className="flex flex-col lg:flex-row w-full flex-grow">
        <div
          className={`bg-white dark:bg-darkestgray rounded-lg overflow-hidden ${
            selectedBox === 1 ? "border border-gray-200 dark:border-medgray" : ""
          }`}
          style={{ flexBasis: `${leftSize}%` }}
          onClick={() => setSelectedBox(1)}
        >
          {/* Box 1 */}
          <div
            className="bg-white dark:bg-darkgray rounded-lg flex flex-col h-full"
            style={{ flexBasis: `${leftSize}%` }}
          >
            <QuestionNavigator
              handleNewQuestion={handleNewQuestion}
              handleNewCase={handleNewCase}
            />
            {casesData && questionsData && (
              <QuestionBox
                currentQuestion={questionsData[currentQuestionIndex]}
                currentCase={casesData[caseIndex]}
              />
            )}
          </div>
        </div>

        {/* Resize handle */}
        <div
          className="relative cursor-ew-resize flex items-center justify-center"
          style={{ width: "8px" }}
          onMouseDown={() => setIsResizing(1)}
        >
          <div
            className={
              isResizing === 1
                ? "rounded w-0.5 h-full bg-blue-500"
                : "rounded-full w-0.5 h-8 bg-gray-300 dark:bg-medgray hover:bg-transparent"
            }
          ></div>
        </div>

        {/* Box 2 and 3 y-axis movement */}
        <div
          className="flex flex-col flex-grow"
          style={{ flexBasis: `${100 - leftSize}%` }}
        >
          {/* <div
            className={`bg-white rounded-lg overflow-hidden ${
              selectedBox === 2 ? "border border-gray-200" : ""
            }`}
            style={{ flexBasis: `${100 - leftSize}%` }}
            onClick={() => setSelectedBox(2)}
          >
            <div
              className="bg-white w-full h-full overflow-hidden flex flex-col"
              style={{ flexBasis: `${100 - bottomSize}%` }}
            >
              <div className="text-center p-2 py-3 bg-gray-50">
                <WorkspaceSelection
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                />
              </div> */}

              {/* <div className="flex-grow overflow-auto"> */}
                {/* {selectedWorkspace === "Tables" && <TablesWorkspace />} */}
                {/* {selectedWorkspace === "Whiteboard" && <WhiteboardWorkspace />} */}
                {/* {selectedWorkspace === "Code" && <CodeWorkspace />} */}
                {/* {selectedWorkspace === "Plugins" && <Plugins />} */}
              {/* </div>
            </div>
          </div> */}

          {/* Y-axis Resize handle */}
          {/* <div
            className="relative cursor-ns-resize flex items-center justify-center"
            style={{ height: "8px" }}
            onMouseDown={() => setIsResizing(2)}
          >
            <div
              className={
                isResizing === 2
                  ? "rounded w-full h-0.5 bg-blue-500"
                  : "rounded-full w-8 h-0.5 bg-gray-300 hover:bg-transparent"
              }
            ></div>
          </div> */}

          {/* Box 3 */}
          <div
            className={`flex bg-white dark:bg-darkgray rounded-lg  h-full overflow-hidden w-full  ${
              selectedBox === 3 ? "border border-gray-200 dark:border-medgray" : ""
            }`}
            onClick={() => setSelectedBox(3)}
          >
            <div className="flex flex-col h-full w-full rounded-lg overflow-hidden ">
              <div className="text-center p-2 py-3 bg-gray-50 dark:bg-semidarkgray">
                <InterviewAILogo />
              </div>
              <div className="h-[800px] p-0 w-full">
                {questionsData && questionsData.length > 0 && authProfile && (
                  <InterviewBody
                    questionId={questionsData[currentQuestionIndex].questionId}
                    userId={authProfile.user_id}
                    token={token}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
