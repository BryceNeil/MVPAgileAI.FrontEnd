// components/UserProfileDropdown.jsx
"use client";
import { useState, useRef, useEffect } from 'react';
import { useOutsideAlerter } from '@/app/hooks/useOutsideAlerter';
import { User, Settings, PlusCircle, ArrowUpCircle, LogOut } from 'react-feather'; // Corrected icon imports
import { useRouter } from "next/navigation";
import { getUserProfile } from '@/datafetch';

interface UserProfileDropdownProps {
    isloggedIn: boolean;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
    isloggedIn,
}) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [initial, setInitial] = useState('');
    const wrapperRef = useRef(null);
    const router = useRouter();
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem("accessToken") || '' : undefined;
    const userData = getUserProfile(accessToken);
    useEffect(() => {
        if (accessToken) {
            getUserProfile(accessToken)
                .then(userData => {
                    if (userData && userData.email) {
                        const userEmail = userData.email;
                        setEmail(userEmail);
                        const userInitial = userEmail.charAt(0);
                        setInitial(userInitial);
                    } else {
                        console.error('User data or email not available.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [accessToken]);
    const iconSize = 24

    const logout = () => {
        localStorage.setItem("accessToken", "");
        localStorage.setItem("isLoggedIn", "false");
        router.push("/login"); // Navigate to the desired route
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
                    {isloggedIn ? (
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
                            <a className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-darkgray">
                                <Settings size={iconSize} className="mr-2" /> Settings
                            </a>
                            <a className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-darkgray">
                                <PlusCircle size={iconSize} className="mr-2" /> Apps & Integrations
                            </a>
                            <a className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-darkgray">
                                <ArrowUpCircle size={iconSize} className="mr-2" /> Upgrade
                            </a>
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
