"use client"
import React, { useState } from 'react';
import { useTheme } from '../theme/ThemeContext';
import NavActions from './metrics/NavActions';
import SearchInput from './SearchInput';
import UserProfileDropdown from './profile/UserProfileDropdown';

const Navbar: React.FC = () => {
    const [sessionName, setSessionName] = useState('');
    const [isInputVisible, setInputVisible] = useState(true);
    const { theme } = useTheme(); // Use the hook to get the current theme

    const handleInputSubmit = (e) => {
        e.preventDefault();
        setSessionName(e.target.elements.sessionInput.value);
        setInputVisible(false);
    };

    return (
        <div className={`h-8 flex items-center justify-between px-4 mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {/* Logo and navigation arrows */}
            <div className="flex items-center">
                <img src="/AgileAILogo4.svg" alt="Logo" className={`w-10 h-7 mr-2 ${theme === 'dark' ? 'filter invert' : ''}`} />
                <h2 className={`w-full flex items-center h-8 py-0.5 px-2 text-sm rounded-md ${theme === 'dark' ? 'bg-semidarkgray text-white' : 'bg-gray-200 text-gray-500'}`}>Google APM</h2>
            </div>

            {/* Other navbar items */}
            <div className="flex items-center">
                <SearchInput/>
                
                <div className={`w-px h-6 mx-3 ${theme === 'dark' ? 'bg-icongray' : 'bg-gray-300'}`}></div> 

                <NavActions/>       

                <UserProfileDropdown />
            </div>
        </div>
    );
};

export default Navbar;
