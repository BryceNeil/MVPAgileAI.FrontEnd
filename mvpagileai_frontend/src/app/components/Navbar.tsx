"use client"
import React, { useState } from 'react';
import NavActions from './metrics/NavActions';
import SearchInput from './SearchInput';
import UserProfileDropdown from './profile/UserProfileDropdown';

const Navbar: React.FC = () => {
    const [sessionName, setSessionName] = useState('');
    const [isInputVisible, setInputVisible] = useState(true);

    const handleInputSubmit = (e) => {
        e.preventDefault();
        setSessionName(e.target.elements.sessionInput.value);
        setInputVisible(false);
    };

    return (
        <div className="h-8 flex items-center justify-between px-4 mb-2 text-white">
            {/* Logo and navigation arrows */}
            <div className="flex items-center">
                <img src="/AgileAILogo4.svg" alt="Logo" className="w-10 h-7 mr-2" />
                <h2 className="w-full flex items-center h-8 py-0.5 px-2 text-sm bg-gray-200 text-gray-500 rounded-md">Google APM</h2>
            </div>

            {/* Other navbar items */}
            <div className="flex items-center">
                <SearchInput/>
                
                <div className="w-px h-6 mx-3 bg-gray-300"></div> 

                <NavActions/>       

                {/* <a href="#" className="mx-2 hover:underline text-black">Home</a> */}
                {/* <a href="#" className="mx-2 hover:underline text-black">About</a>
                <a href="#" className="mx-2 hover:underline text-black">Contact</a> */}
                {/* <div className="mx-2 font-light text-black">AgileAI</div> */}
                <UserProfileDropdown />

            </div>
        </div>
    );
};

export default Navbar;
