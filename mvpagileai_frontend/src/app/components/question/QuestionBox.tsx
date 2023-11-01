import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, HelpCircle } from 'react-feather';


const QuestionComponent = ({ title, difficulty, skills, description, examples, constraints }) => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

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

    
    return (
        <div className="bg-white rounded-lg flex flex-col relative flex-grow mt-4 px-4 h-full">
            <div className="overflow-y-auto flex-grow"> {/* Scrollable div with flex-grow */}
                <h1 className="text-black text-xl font-bold mb-2">{title}</h1>
    
                <div className="mb-4 flex space-x-2">
                    <span className="bg-blue-100 text-blue-500 text-xs rounded-full px-3 py-1">{difficulty}</span>
                    {skills.map(skill => (
                        <span key={skill} className="bg-gray-200 text-gray-800 text-xs rounded-full px-3 py-1">{skill}</span>
                    ))}
                </div>
    
                <p className="text-gray-500 text-sm mb-4">{description}</p>
    
                {examples.map((example, index) => (
                    <div key={index} className="mb-4 text-sm">
                        <p className="text-black font-semibold mb-2">{`Example ${index + 1} :`}</p>
                        <p className="font-mono"><span className="text-black">Input:</span> <span className="text-gray-500">{example.input}</span></p>
                        <p className="font-mono mt-2"><span className="text-black">Output:</span> <span className="text-gray-500">{example.output}</span></p>
                    </div>
                ))}
    
                <ul className="text-black list-disc pl-4">
                    <li className="mb-1">
                        <div className="bg-gray-100 border border-gray-200 rounded px-2 inline-block text-sm font-mono">
                            <span className="text-gray-800">{`1 <= k <= nums.length <= 10^5`}</span>
                        </div>
                    </li>
                    <li>
                        <div className="bg-gray-100 border border-gray-200 rounded px-2 inline-block text-sm font-mono">
                            <span className="text-gray-800">{`-10^4 <= nums[i] <= 10^4`}</span>
                        </div>
                    </li>
                </ul>
            </div>
    
            {/* this div */}
            <div className="bg-white text-xs text-gray-500 p-2 flex justify-start space-x-2"> {/* Background and hover effect added */}
                <button className="flex items-center p-2 hover:bg-gray-200 rounded" onClick={() => toggleLike()}>
                    <ThumbsUp size={14} className={`mr-2 ${liked ? 'text-blue-500' : 'text-gray-500'}`} />
                    <span>{formatCount(likes)}</span>
                </button>
                <button className="flex items-center p-2 hover:bg-gray-200 rounded" onClick={() => toggleDislike()}>
                    <ThumbsDown size={14} className={`mr-2 ${disliked ? 'text-red-500' : 'text-gray-500'}`} />
                    <span>{formatCount(dislikes)}</span>
                </button>
                <button className="p-2 hover:bg-gray-200 rounded">
                    <HelpCircle size={14} className="text-gray-500 " />
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
