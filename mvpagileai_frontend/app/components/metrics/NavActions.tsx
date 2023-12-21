"use client"
import React, { useState } from "react";
import { useTheme } from "../theme/ThemeContext";
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
            <button 
                className="h-8 mr-4 flex justify-center items-center w-10 p-1 hover:bg-gray-300 hover:bg-opacity-50 dark:hover:bg-semidarkgray transition duration-300 rounded-md"
                onClick={toggleTheme}
            >
                {theme === 'light' ? <Moon color="#6B7280" size={iconSize} /> : <Sun color="#6B7280" size={iconSize} />}
            </button>
        </>
    );
};

export default NavActions;
