"use client"
import { MessageType, Rubric } from "@/app/types";
import React, { useEffect, useRef, useState } from "react";
import Message from "./Message"; // Adjust the import path if necessary
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import {fetchEventSource} from "@microsoft/fetch-event-source";
import { API_URL } from "@/consts";

import { evaluate, getChatHistory } from "@/datafetch";
import { Send } from 'react-feather'; // Import the icon
import { useRubric } from "@/app/props/RubricProvider";
import { useCase } from "@/app/props/CaseProvider";

interface InterviewBodyProps {
    questionId: string;
    userId: string;
    userInitial: string | undefined;
    token: string | undefined;
}

const DEFAULT_MESSAGE = {from: "computer", text: "Hey, I'm Agile AI. Feel free to ask me questions and when your ready for your answer to be evaluated, start it with '/' and I'll give you feedback in the 'rubric' tab."}

const InterviewBody: React.FC<InterviewBodyProps> = ({ questionId, userId, token, userInitial }) => {
    const [abortController, setAbortController] = useState(new AbortController());
    const { isGraded, setIsGraded, setRubricData, rubricData } = useRubric();
    const { caseData, currentQuestionIndex, setCaseData } = useCase();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<MessageType[]>([DEFAULT_MESSAGE])
    const [answer, setAnswer] = useState<string>("");
    const rubric = caseData.questions[currentQuestionIndex].rubric
    const question = caseData.questions[currentQuestionIndex].question
    const caseDesc = caseData.scenario
    const { data, refetch } = useQuery({
        queryKey: ["chat"],
        queryFn: async () => {
          const res = await fetch(
            `${API_URL}/content/question/${questionId}/chat`
          );
          if (res.ok) {
            const data =  await res.json();
            setMessages(prev=>[DEFAULT_MESSAGE, ...data])
            return data;
          } else {
            return [];
          }
        },
    });

    useEffect(()=>{
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({behavior: 'smooth'})
        }
      }, [messages])
    
    useEffect(()=>{
        setMessages([DEFAULT_MESSAGE]);
        refetch()
        abortController.abort();
        setAbortController(new AbortController());
    }, [questionId])

    const sendAnswer = async () =>{
        const fetchData = async () => {
          await fetchEventSource(`${API_URL}/content/conversation`, {
            method: "POST",
            body: JSON.stringify({
              userId: userId,
              questionId: questionId,
              answer: answer
            }),
            signal: abortController.signal,
            headers: {
              'Accept': 'text/event-stream',
              'Content-Type': 'application/json'
            },
            async onopen(res) {
              if (res.ok && res.status == 200) {
                console.log("[CONNECTION MADE]")
              } else {
                console.log("ERR")
                console.log(await res.json())
              }
            },
            onerror(err){
              console.log('[ERROR] While Streaming Response')
              console.log(err)
            },
            async onmessage(event) {
              const newText = event.data;
              setMessages(prev=>{
                const newData =[...prev]
                const last = newData[newData.length - 1];
                const newLast = {
                  ...last, text: last.text + newText
                }
                newData[newData.length - 1] = newLast;
                return newData;
              });
            }
          });
        }
        await fetchData();
      }
      const handleAddMessage = async () => {
        const newUserMessage = {
          from: "user",
          text: answer,
        };
        setMessages((prev) => [...prev, newUserMessage]);
      
        const newComputerMessage = {
          from: "computer",
          text: "",
        };
        setMessages((prev) => [...prev, newComputerMessage]);
      
        setAnswer("");
        await sendAnswer();
      };

      const handleSubmitAnswer = async () => {
        const resString = await evaluate(answer, userId, questionId, rubric, question, caseDesc);
        const res = JSON.parse(resString);
        if(res && res.grades){
          const rubric = caseData.questions[currentQuestionIndex].rubric
          const updatedRubric = rubric.map((item: Rubric, index: number) => {
            if (index < res.grades.length) {
              return { ...item, grade: res.grades[index] };
            }
            return item; // Keep the original rubric item if there's no corresponding grade
          });
          const newRubricData = [...rubricData]; // Create a copy of the rubricData
          newRubricData[currentQuestionIndex] = updatedRubric;
          const oldCaseData = [...caseData.questions]
          oldCaseData[currentQuestionIndex].rubric = updatedRubric
          const updatedCaseData = { ...caseData, questions: oldCaseData}
          setCaseData(updatedCaseData)
          setRubricData(newRubricData);
          setAnswer("");
      }
    }

    return (
    <div className="h-full flex flex-col justify-between w-full text-sm relative rounded-lg overflow-y-hidden">
      <div className="flex flex-col h-full overflow-y-scroll">
        {messages && messages.map((message: MessageType, ix: number)=>(
          <Message key={ix} from={message.from} text={message.text} initial={userInitial}></Message> ))}
          <div className="h-full  pb-24 " ref={messagesEndRef}></div>
      </div>
     <div className="px-8 pt-4">
        <div className="flex flex-row bottom-0 w-full h-12 bg-white dark:bg-darkgray border-t border-gray-100 dark:border-darkgray">
          <input className="flex-1 bg-white p-2 my-1 dark:bg-darkgray border-y-2 border-l-2 rounded-l-md h-[90%] text-black dark:text-white" type="text" onChange={(e) => setAnswer(e.target.value)} value={answer} 
          onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Prevent default form submission behavior
                handleAddMessage(); // Trigger the same action as the button click
              } }}
          />
          <button onClick={async ()=> await handleAddMessage()} className="w-12 h-12 rounded-r-md border-y-2 border-r-2 bg-gray-100 dark:bg-medgray hover:bg-gray-200 h-[90%] my-1">
            <Send size={16} className="text-gray-600 dark:text-icongray mx-3" />
          </button>
        </div>
        <button onClick={handleSubmitAnswer} className="text-gray-800 dark:text-gray-100 mt-2">
            Evaluate Answer
        </button>
      </div>
    </div>
    )
}

export default InterviewBody