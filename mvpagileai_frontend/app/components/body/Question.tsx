"use client";
import React, {useState } from "react";
import QuestionNavigator from "../question/QuestionNavigator";
import QuestionBox from "../question/QuestionBox";


const Question = () => {  
    const [leftSize, setLeftSize] = useState(70);
    const [selectedBox, setSelectedBox] = useState<number | null>(null); // State to keep track of the selected box


    

    return (
      <div className={`bg-white dark:bg-darkestgray rounded-lg overflow-hidden ${selectedBox === 1 ? "border border-gray-200 dark:border-medgray" : ""}`} style={{ flexBasis: `${leftSize}%` }}
      onClick={() => setSelectedBox(1)}>
      <div className="bg-white dark:bg-darkgray rounded-lg flex flex-col h-full" style={{ flexBasis: `${leftSize}%` }}>
        <QuestionNavigator />
        <QuestionBox />
        
      </div>
    </div>
    )
}

export default Question