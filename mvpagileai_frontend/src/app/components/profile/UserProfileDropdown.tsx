// components/UserProfileDropdown.jsx
import { useState, useRef } from 'react';
import { useOutsideAlerter } from '@/app/hooks/useOutsideAlerter';
import { User, Settings, PlusCircle, ArrowUpCircle, LogOut } from 'react-feather'; // Corrected icon imports

const UserProfileDropdown = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, () => setDropdownVisible(false));

    const iconSize = 16; // Smaller icon size as requested

    const userName = "Bryce Neil"; // This would come from props or user context in a real app
    const userInitial = userName.charAt(0); // Get the first letter of the user's name

    return (
        <div ref={wrapperRef} className="relative">
            {/* Profile Initial Button */}
            <div
                onClick={() => setDropdownVisible(!isDropdownVisible)}
                className="flex items-center justify-center cursor-pointer bg-blue-500 text-white rounded-full h-8 w-8"
            >
                <span className="font-medium text-white uppercase">{userInitial}</span>
            </div>

            {/* Dropdown Menu */}
            {isDropdownVisible && (
                <div className="absolute right-0 mt-2 py-2 px-2 min-w-max bg-white dark:bg-darkgray rounded-md shadow-xl z-20">
                    {/* User Info */}
                    <div className="block pl-2 pr-4 py-2 text-sm text-gray-700 dark:text-white">
                        <div className="flex items-center">
                            <div className="bg-blue-500 rounded-full h-8 w-8 flex items-center justify-center">
                                <span className="font-medium text-lg text-white uppercase">{userInitial}</span>
                            </div>
                            <div className="ml-3">
                                <span className="font-semibold block">{userName}</span>
                                <span className="text-gray-400 dark:text-gray-300 text-xs block">bryceneil123@gmail.com</span>
                            </div>
                        </div>
                    </div>
                    {/* Menu Items */}
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-darkgray">
                        <Settings size={iconSize} className="mr-2" /> Settings
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-darkgray">
                        <PlusCircle size={iconSize} className="mr-2" /> Apps & Integrations
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-darkgray">
                        <ArrowUpCircle size={iconSize} className="mr-2" /> Upgrade
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-darkgray">
                        <LogOut size={iconSize} className="mr-2" /> Log out
                    </a>
                </div>
            )}
        </div>
    );
};

export default UserProfileDropdown;
