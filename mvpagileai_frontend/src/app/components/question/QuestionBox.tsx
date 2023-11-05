import React, { useState, useRef } from 'react';
import { ThumbsUp, ThumbsDown, HelpCircle, Award } from 'react-feather';


const QuestionComponent = ({ title, difficulty, skills, description, examples, constraints }) => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [showRubric, setShowRubric] = useState(false); // State to control rubric visibility


    const formatCount = (count) => {
        if (count >= 1e6) return `${(count / 1e6).toFixed(1)}M`;
        if (count >= 1e3) return `${(count / 1e3).toFixed(1)}K`;
        return count;
    }

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const toggleLike = () => {
        if (liked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
            if (disliked) {
                setDislikes(dislikes - 1);
                setDisliked(false);
            }
        }
        setLiked(!liked);
    };

    const toggleDislike = () => {
        if (disliked) {
            setDislikes(dislikes - 1);
        } else {
            setDislikes(dislikes + 1);
            if (liked) {
                setLikes(likes - 1);
                setLiked(false);
            }
        }
        setDisliked(!disliked);
    };

      // Ref for the rubric section
      const rubricRef = useRef(null);

      // Function to toggle the rubric visibility
      const toggleRubricVisibility = () => {
          setShowRubric(!showRubric);
      };
  
    
    return (
        <div className="bg-white dark:bg-darkgray rounded-lg flex flex-col relative mt-4 px-4 h-full" style={{ maxHeight: 'calc(100vh - var(--navbar-height))' }}>
            <div className="overflow-y-auto pb-16 dark:text-white"> {/* Add dark mode text color */}

            {/* ... main content ... */}

                {/* in scroll view */}

                <h1 className="text-black dark:text-white text-xl font-bold mb-2">{title}</h1>
    
                <div className="mb-4 flex space-x-2">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-300 text-xs rounded-full px-3 py-1">{difficulty}</span>
                    {skills.map(skill => (
                        <span key={skill} className="bg-gray-200 dark:bg-darkgray text-gray-800 dark:text-gray-300 text-xs rounded-full px-3 py-1">{skill}</span>
                    ))}
                </div>
    
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{description}</p>
    
                {examples.map((example, index) => (
                    <div key={index} className="mb-4 text-sm">
                        <p className="text-black dark:text-white font-semibold mb-2">{`Example ${index + 1} :`}</p>
                        <p className="font-mono"><span className="text-black dark:text-white">Input:</span> <span className="text-gray-500 dark:text-gray-400">{example.input}</span></p>
                        <p className="font-mono mt-2"><span className="text-black dark:text-white">Output:</span> <span className="text-gray-500 dark:text-gray-400">{example.output}</span></p>
                    </div>
                ))}
    
                <ul className="text-black dark:text-white list-disc pl-4">
                    <li className="mb-1">
                        <div className="bg-gray-100 dark:bg-semidarkgray border border-gray-200 dark:border-medgray rounded px-2 inline-block text-sm font-mono">
                            <span className="text-gray-800 dark:text-gray-200">{`1 <= k <= nums.length <= 10^5`}</span>
                        </div>
                    </li>
                    <li>
                        <div className="bg-gray-100 dark:bg-semidarkgray border border-gray-200 dark:border-medgray rounded px-2 inline-block text-sm font-mono">
                            <span className="text-gray-800 dark:text-gray-200">{`-10^4 <= nums[i] <= 10^4`}</span>
                        </div>
                    </li>
                </ul>

                {/* Rubric section */}
                {showRubric && (
                     <div ref={rubricRef} className="p-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-3">Sample Rubric</h2>
                        <p className="text-gray-600 dark:text-gray-400">This is where the rubric content will be displayed.</p>
                        {/* ... rubric content ... */}
                    </div>
                )}

            </div>

            {/* rubric should go here */}
            
            {/* in scroll view */}
    
            {/* this div */}
            <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-darkgray text-xs text-gray-500 dark:text-gray-400 p-2 flex justify-start space-x-2 shadow">
                <button className="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-darkgray rounded" onClick={() => toggleLike()}>
                    <ThumbsUp size={14} className={`mr-2 ${liked ? 'text-blue-500' : 'text-gray-500 dark:text-gray-300'}`} />
                    <span>{formatCount(likes)}</span>
                </button>
                <button className="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-darkgray rounded" onClick={() => toggleDislike()}>
                    <ThumbsDown size={14} className={`mr-2 ${disliked ? 'text-red-500' : 'text-gray-500 dark:text-gray-300'}`} />
                    <span>{formatCount(dislikes)}</span>
                </button>
                <button className="p-2 hover:bg-gray-200 dark:hover:bg-darkgray rounded">
                    <HelpCircle size={14} className="text-gray-500 dark:text-gray-300" />
                </button>
                <button className="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-darkgray rounded" onClick={toggleRubricVisibility}>
                    <Award size={14} className="mr-2 text-gray-500 dark:text-gray-300" />
                    <span>Rubric</span>
                </button>
            </div>
        </div>
    );
};

const QuestionBox = () => {
    const questionData = {
        title: "215. Kth Largest Element in an Array",
        difficulty: "Medium",
        skills: ["Topics", "Companies"],
        description: "Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element. Can you solve it without sorting?",
        examples: [
            {
                input: "nums = [3,2,1,5,6,4], k = 2",
                output: "5"
            },
            {
                input: "nums = [3,2,3,1,2,4,5,5,6], k = 4",
                output: "4"
            }
        ],
        constraints: "1 <= k <= nums.length <= 10^5"
    };

    return (
            <QuestionComponent {...questionData} />
    );
};

export default QuestionBox;
