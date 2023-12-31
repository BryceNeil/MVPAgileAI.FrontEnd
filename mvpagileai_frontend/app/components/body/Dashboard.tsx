"use client"

import { User } from "@/app/types";
import { getPastCases, getUserProfile } from "@/datafetch";
import { useQuery } from "@tanstack/react-query";
import SearchInput from "../SearchInput";
import { ChevronRight } from "react-feather"
import { useEffect, useState } from "react";
import { useDashboard } from "@/app/props/DashboardProvider";
import CaseCard from "./CaseCard";


interface DashboardProps {
    authProfile: User
    accessToken: string | undefined
}
const Dashboard: React.FC<DashboardProps> = ({ accessToken, authProfile }) => {
    const [hovered, setHovered] = useState(false);
    const {setDashboardVisible} = useDashboard();
    const [ isLoading, setIsLoading ] = useState(false);
    const [pastCases, setPastCases] = useState(['']);
    const [caseIds, setCaseIds] = useState([''])

    useEffect(() => {
        async function fetchCases() {
            setIsLoading(true);
          try {
            const cases = await getPastCases(authProfile.user_id); // Fetch cases from the database
            setPastCases(cases[0]); // Set the fetched cases in state
            setCaseIds(cases[1]);
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching cases:', error);
          }
        }
    
        fetchCases();
        
    }, []);

    console.log(pastCases)
    return(
        <div className={` flex md:flex-row flex-col justify-between bg-white dark:bg-darkgray w-full h-full dark:bg-darkestgray rounded-lg py-16 px-24 overflow-hidden text-black dark:text-white `}>
            <div className="bg-gray-100 dark:bg-darkestgray hover:scale-[100.5%] shadow-lg transition-all duration-300 w-full rounded-lg p-10  mb-10 mr-20 h-full">
                <div className="text-md font-normal mb-5">
                    {authProfile.email}
                </div>
                <div className="text-4xl">
                    Dashboard
                </div>
                <div className="mt-32 text-xl">
                    Past Challenges
                </div>
                {isLoading ? (
                    <div className="w-full items-center flex flex-col">
                        Loading...
                    </div>
                ):(
                
                <div className="w-full pt-4 h-[60%] bg-white dark:bg-darkgray rounded-lg mt-4 overflow-y-auto overflow-x-hidden"> 
                    {!pastCases || pastCases[0] == null ? (
                        // Show alternative HTML when pastCases is empty
                        <div className="w-full items-center flex flex-col h-[60%] justify-center">No past cases yet!</div>
                    ) : (
                        pastCases.map((caseTitle, index) => (
                        <CaseCard key={index} title={caseTitle} caseId={caseIds[index]} userId={authProfile.user_id}/>
                    ))
                    )}
                </div>)}
                
            </div>
            <div className="w-full h-full flex flex-col justify-between  ">
                <div className="w-full h-[60%] bg-gray-100 shadow-lg py-16 px-16 hover:scale-[100.5%] dark:bg-darkestgray transition-all text-4xl duration-300 rounded-lg">
                    <div className={`h-8 mb-2`}>
                        <div className="mb-4">
                            New Interview
                        </div>
                        <div className="text-sm">
                            Enter a job title you'd like to practice interviewing for
                        </div>
                        <div className="flex items-center mt-28 h-2">
                            <SearchInput userId={authProfile.user_id} height={12} iconSize={10}/>
                        </div>
                    </div>
                    
                </div>  
                <div onClick={()=>{setDashboardVisible(false)}}className={`w-full cursor-pointer h-[30%] bg-gray-100 shadow-lg hover:scale-[100.5%] flex flex-row justify-between items-center px-16 dark:bg-darkestgray transition-all duration-300 rounded-lg ${hovered ? 'hovered' : ''}`}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    >
                    <div className="h-8 mb-2 cursor-pointer">
                        <div className="text-3xl">Resume Recent Interview</div>
                    </div>
                    <div
                        className="text-4xl transition-all duration-300 "
                        style={{ transform: hovered ? 'translateX(20px)' : 'none' }}
                    >
                        <ChevronRight size={60} />
                    </div>
                    </div>     


            </div>
            
        </div>
    )
}

export default Dashboard;