// components/UserProfileDropdown.jsx
"use client";
import { useState, useRef, useEffect } from 'react';
//import { useOutsideAlerter } from '@/app/hooks/useOutsideAlerter';
import { User, Settings, List, ArrowUpCircle, LogOut } from 'react-feather'; // Corrected icon imports
import { useRouter } from "next/navigation";
import { useDashboard } from '@/app/props/DashboardProvider';

interface UserProfileDropdownProps {
    email?: string,
    user_id?: string,
    accessToken: string | undefined
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
    email,
    user_id,
    accessToken,
}) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const initial =  email?.charAt(0);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();
    const {dashboardVisible, setDashboardVisible} = useDashboard();
    const iconSize = 24
    useEffect(() => {
        // Function to handle clicks outside the dropdown
        const handleOutsideClick = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setDropdownVisible(false);
            }
        };

        // Event listener for clicks outside the dropdown
        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            // Clean up the event listener when the component unmounts
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const logout = () => {
        localStorage.clear();
        router.push("/login"); // Navigate to the desired route
    }
    const toggleDash = () => {
        if(dashboardVisible){
            setDashboardVisible(false)
        } else{
            setDashboardVisible(true)
        }
    }



    return (
        <div ref={wrapperRef} className="relative">
            {/* Profile Initial Button */}
            <div
                onClick={() => setDropdownVisible(!isDropdownVisible)}
                className="flex items-center justify-center cursor-pointer bg-blue-500 text-white rounded-full h-8 w-8"
            >
                <span className="font-medium text-white uppercase">{initial}</span>
            </div>

            {/* Dropdown Menu */}
            {isDropdownVisible && (
                <div className="absolute right-0 mt-2 py-2 px-2 min-w-max bg-white dark:bg-darkgray rounded-md shadow-xl z-20">
                    {/* User Info */}
                    {accessToken ? (
                        <div>
                            <div className="block pl-2 pr-4 py-2 text-sm text-gray-700 dark:text-white">
                                <div className="flex items-center">
                                    <div className="bg-blue-500 rounded-full h-8 w-8 flex items-center justify-center">
                                        <span className="font-medium text-lg text-white uppercase">{initial}</span>
                                    </div>
                                    <div className="ml-3">
                                        <span className="font-semibold block">{email}</span>
                                        <span className="text-gray-400 dark:text-gray-300 text-xs block">{email}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <a onClick={()=> {toggleDash()}}className={`flex cursor-pointer rounded-md items-center ${dashboardVisible ? 'bg-gray-100 dark:bg-darkestgray' : 'bg-white dark:bg-darkgray'} px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-darkestgray`}>
                                <List size={iconSize} className="mr-2" /> Dashboard
                            </a>
                            {/* <a className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-darkgray">
                                <ArrowUpCircle size={iconSize} className="mr-2" /> Upgrade
                            </a> */}
                            <a className="flex items-center cursor-pointer px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-darkgray">
                                <Settings size={iconSize} className="mr-2" /> Settings
                            </a>
                            <hr></hr>
                            <a onClick={logout} className="cursor-pointer flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-darkgray">
                                <LogOut size={iconSize} className="mr-2" /> Log out
                            </a>
                        </div>
                    ) : (
                        <div>
                            <div className="cursor-pointer border-b-2" onClick={() => router.push("/login")}>
                                Login
                            </div>
                            <div className="cursor-pointer" onClick={() => router.push("/register")}>
                                Sign Up
                            </div>
                            
                        </div>

                    )}
                </div>
            )}
        </div>
    );
};

export default UserProfileDropdown;
