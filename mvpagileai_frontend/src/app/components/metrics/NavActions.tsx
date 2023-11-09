import React, { useState } from "react";
import { useTheme } from "@/app/theme/ThemeContext";
import { Sun, Moon } from 'react-feather';

const NavActions = ({ iconSize = 14 }) => {
    // const [theme, setTheme] = useState('light'); // State to manage the theme (light or dark)
    const { theme, setTheme } = useTheme();


    const totalCareerXP = 1050; // This can be replaced with the actual total career xp points.

    // Function to toggle the theme
    // const toggleTheme = () => {
    //     setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    // };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <>
            <div className="h-8 flex justify-center items-center w-auto p-1 hover:bg-gray-300 hover:bg-opacity-50 dark:hover:bg-semidarkgray transition duration-300 rounded-md">      
                <div className="border border-gray-500 text-xs text-gray-500 p-0.5 px-2 rounded mr-2">
                    xp
                </div>
                <span className="text-sm text-gray-500 mr-2">
                    {totalCareerXP}
                </span>
            </div>

            <div className="h-8 mx-2 flex justify-center items-center w-auto p-1 hover:bg-gray-300 hover:bg-opacity-50 dark:hover:bg-semidarkgray transition duration-300 rounded-md">
                <img 
                    src="/fire.svg" 
                    alt="fire logo" 
                    className={`mr-2 w-6 h-6 text-gray-500`} 
                    style={{width: '16px', height: '16px'}}
                />     
                <div className="text-sm text-gray-500">
                    5
                </div>
            </div>

            <button 
                className="h-8 ml-2 mr-4 flex justify-center items-center w-10 p-1 hover:bg-gray-300 hover:bg-opacity-50 dark:hover:bg-semidarkgray transition duration-300 rounded-md"
                onClick={toggleTheme}
            >
                {theme === 'light' ? <Moon color="#6B7280" size={iconSize} /> : <Sun color="#6B7280" size={iconSize} />}
            </button>
        </>
    );
};

export default NavActions;
