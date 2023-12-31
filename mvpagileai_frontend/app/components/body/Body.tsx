"use client";
import React, {useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCaseQuestions, getCases, getUserProfile } from "@/datafetch";
import { useRouter } from "next/navigation";
import Question from "./Question";
import Interview from "./Interview";
import { CaseProvider } from "@/app/props/CaseProvider";
import { useDashboard } from "@/app/props/DashboardProvider";
import Dashboard from "./Dashboard";

interface BodyProps {
  accessToken: string | undefined,
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

const Body: React.FC<BodyProps> = ({accessToken}) => {
  /* Check logged in */
  const router = useRouter();
  const { data: authProfile, isSuccess } = useQuery({
    queryKey: ["auth"],
    queryFn: () => getUserProfile(accessToken),
  });

  const [leftSize, setLeftSize] = useState(70);
  const [bottomSize, setBottomSize] = useState(33); // Changed the initial valu to 33 for equal distribution
  const [isResizing, setIsResizing] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState(2);
  const { dashboardVisible, setDashboardVisible} = useDashboard();

  const selectedWorkspace = mapIdToWorkspace(selectedId ?? 2);

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
      <div className="flex flex-grow p-0 overflow-hidden" onMouseMove={handleMouseMove} onMouseUp={() => setIsResizing(null)}>
        { !dashboardVisible ? (
        <div className="flex flex-col lg:flex-row w-full flex-grow">
          <Question />
          {/* Resize handle */}
          <div className="relative cursor-ew-resize flex items-center justify-center" style={{ width: "8px" }} onMouseDown={() => setIsResizing(1)}>
            <div className={ isResizing === 1 ? "rounded w-0.5 h-full bg-blue-500" : "rounded-full w-0.5 h-8 bg-gray-300 dark:bg-medgray hover:bg-transparent"}>
            </div>
          </div>
          <Interview authProfile={authProfile} accessToken={accessToken}/>
        </div>
        ) : (
          <div className="w-full h-[92vh]">
            <Dashboard authProfile={authProfile} accessToken={accessToken}/>
          </div>
        )}
      </div>
  );
};

export default Body;
