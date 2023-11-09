import React, { useState, useRef } from "react";
import { ThumbsUp, ThumbsDown, HelpCircle, Award } from "react-feather";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../../../consts";
import { getCaseQuestions } from "@/datafetch";


interface QuestionProps {
  currentCase: {
    title: string;
    description: string;
    categories: string[];
  };
  currentQuestion: {
    title: string;
    description: string;
    skills: string[];
    difficulty: string;
  };
}
const QuestionComponent = ({ currentCase, currentQuestion }: QuestionProps) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
    const [showRubric, setShowRubric] = useState(false); // State to control rubric visibility


  const formatCount = (count: number) => {
    if (count >= 1e6) return `${(count / 1e6).toFixed(1)}M`;
    if (count >= 1e3) return `${(count / 1e3).toFixed(1)}K`;
    return count;
  };

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
  

  const { data: questions } = useQuery({
    queryKey: ["questions"],
    queryFn: () => getCaseQuestions(caseId),
  });
  return (
    <div className="bg-white dark:bg-darkgray rounded-lg flex flex-col relative flex-grow mt-4 px-4 h-full">
      <div className="overflow-y-auto flex-grow">
        {" "}
        {/* Scrollable div with flex-grow */}
        <h1 className="text-black dark:text-gray-50 text-xl font-semibold mb-2">
          {currentCase.title}
        </h1>
        <div className="mb-4 flex space-x-2">
          <span className="bg-blue-400 bg-opacity-30 text-blue-500 text-xs rounded-full px-3 py-1">
            {(currentQuestion && currentQuestion.difficulty) ?? "Medium"}
          </span>
          {currentQuestion && currentQuestion.skills &&
            currentQuestion.skills.map((skill) => (
              <span
                key={skill}
                className="bg-gray-200 text-gray-800 text-xs rounded-full px-3 py-1"
              >
                {skill}
              </span>
            ))}
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{currentCase.description}</p>
        {currentQuestion && currentQuestion.examples &&
          currentQuestion.examples.map((example: any, index: number) => (
            <div key={index} className="mb-4 text-sm">
              <p className="text-black dark:text-gray-50 font-semibold mb-2">{`Example ${
                index + 1
              } :`}</p>
              <p className="font-mono">
                <span className="text-black dark:text-gray-50">Input:</span>{" "}
                <span className="text-gray-500">{example.input}</span>
              </p>
              <p className="font-mono mt-2">
                <span className="text-black">Output:</span>{" "}
                <span className="text-gray-500">{example.output}</span>
              </p>
            </div>
          ))}
        {currentQuestion && (
          <span className="text-black dark:text-gray-50"><b>Question: </b>{currentQuestion.title}</span>
        )}
      </div>

      {/* this div */}
      <div className="bg-white dark:bg-darkgray text-xs text-gray-500 p-2 flex justify-start space-x-2">
        {" "}
        {/* Background and hover effect added */}
        <button
          className="flex items-center p-2 hover:bg-gray-200 hover:dark:bg-darkestgray rounded"
          onClick={() => toggleLike()}
        >
          <ThumbsUp
            size={14}
            className={`mr-2 ${liked ? "text-blue-500" : "text-gray-500"}`}
          />
          <span>{formatCount(likes)}</span>
        </button>
        <button
          className="flex items-center p-2 hover:bg-gray-200 hover:dark:bg-darkestgray rounded"
          onClick={() => toggleDislike()}
        >
          <ThumbsDown
            size={14}
            className={`mr-2 ${disliked ? "text-red-500" : "text-gray-500"}`}
          />
          <span>{formatCount(dislikes)}</span>
        </button>
        <button className="p-2 hover:bg-gray-200 hover:dark:bg-darkestgray rounded">
          <HelpCircle size={14} className="text-gray-500 " />
        </button>
      </div>
    </div>
  );
};

interface QuestionBoxProps {
  currentCase: {
    caseId: string;
    title: string;
    description: string;
  };
  currentQuestion: {
    questionId: string;
    title: string;
    description: string;
  };
}
const QuestionBox: React.FC<QuestionBoxProps> = ({
  currentCase,
  currentQuestion,
}) => {
  if (currentCase)
    return (
      <QuestionComponent
        currentCase={currentCase}
        currentQuestion={currentQuestion}
      />
    );
};

export default QuestionBox;
