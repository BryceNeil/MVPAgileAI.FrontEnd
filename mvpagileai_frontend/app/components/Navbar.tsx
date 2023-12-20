"use client"
import React, { FormEvent, useState, useRef  } from 'react';
import NavActions from './metrics/NavActions';
import SearchInput from './SearchInput';
import UserProfileDropdown from './profile/UserProfileDropdown';
import { getUserProfile } from '@/datafetch';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from './theme/ThemeContext';
import JobTitleDisplay from './header/JobTitleDisplay';


interface NavBarProps {
    accessToken: string | undefined;
}
const Navbar: React.FC<NavBarProps> = ({accessToken}) => {
    const [sessionName, setSessionName] = useState('');
    const [isInputVisible, setInputVisible] = useState(true);
    const { theme } = useTheme();
    const sessionInputRef = useRef<HTMLInputElement | null>(null);

    const { data: authProfile, isSuccess } = useQuery({
        queryKey: ["auth"],
        queryFn: () => getUserProfile(accessToken),
      });


    const handleInputSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Access the input value using the ref
        const inputElement = sessionInputRef.current;

        if (inputElement) {
            setSessionName(inputElement.value);
            setInputVisible(false);
        }
    };

    return (
        <div className={`h-8 flex flex-row items-center justify-between px-4 mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {/* Logo and navigation arrows */}
            <div className="flex items-center">
                <img src="/AgileAILogo4.svg" alt="Logo" className={`w-10 h-7 mr-2 ${theme === 'dark' ? 'filter invert' : ''}`} />
                <JobTitleDisplay/>
            </div>

            {/* Other navbar items */}
            <div className="flex items-center">
                <SearchInput/>
                
                <div className={`w-px h-6 mx-3 ${theme === 'dark' ? 'bg-icongray' : 'bg-gray-300'}`}></div> 
                <div className="hidden md:flex">
                    <NavActions/>  
                </div>
                     
                {authProfile && accessToken &&
                    <UserProfileDropdown email={authProfile.email} user_id={authProfile.user_id} accessToken={accessToken} />
                }
            </div>
        </div>
    );
};

export default Navbar;
