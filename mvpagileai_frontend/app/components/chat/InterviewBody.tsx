"use client"
import { MessageType } from "@/app/types";
import React, { useEffect, useRef, useState } from "react";
import Message from "./Message"; // Adjust the import path if necessary
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import {fetchEventSource} from "@microsoft/fetch-event-source";
import { API_URL } from "@/consts";
import { flushSync } from "react-dom";
import { getChatHistory } from "@/datafetch";
import { Send } from 'react-feather'; // Import the icon

interface InterviewBodyProps {
    questionId: string;
    userId: string;
    userInitial: string | undefined;
    token: string | undefined
}

const DEFAULT_MESSAGE = {from: "computer", text: "Hey, I'm Agile AI. Feel free to ask me questions and when your ready for your answer to be evaluated, start it with '/' and I'll give you feedback in the 'rubric' tab."}

const InterviewBody: React.FC<InterviewBodyProps> = ({ questionId, userId, token, userInitial }) => {
    const [abortController, setAbortController] = useState(new AbortController());
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<MessageType[]>([DEFAULT_MESSAGE])
    const [answer, setAnswer] = useState<string>("");

    const { data, refetch } = useQuery({
        queryKey: ["chat"],
        queryFn: async () => {
          const res = await fetch(
            `${API_URL}/content/question/${questionId}/chat`
          );
          if (res.ok) {
            const data =  await res.json();
            setMessages(prev=>[...prev, ...data])
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
          await fetchEventSource(`${API_URL}/content/answer`, {
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
      const handleAddMessage = async () =>{
   
        // Def find out how to not use flushSync here (esp. twice)
        flushSync(()=>{
           const newMessage = {
             from: "user",
             text: answer,
           };
          setMessages(prev=>[...prev, newMessage]);
        })
        flushSync(()=>{
          const newMessage = {
            from: "computer",
            text: ""
          }
          setMessages(prev=>[...prev, newMessage]);
        })
        setAnswer("");
        await sendAnswer()
      }

    return (
    <div className="h-full w-full text-sm relative rounded-lg overflow-y-hidden">
     <div className="flex h-[100%] flex-col overflow-y-scroll">
     {messages && messages.map((message: MessageType, ix: number)=>(
      <Message key={ix} from={message.from} text={message.text} initial={userInitial}></Message> ))}
      <div className="h-full  pb-24 " ref={messagesEndRef}></div>
     </div>
      <div className="absolute flex flex-row bottom-0 w-full h-12 bg-white dark:bg-darkgray border-t border-gray-100 dark:border-medgray">
        <input className="flex-1 bg-white p-2 ml-4 my-1 dark:bg-darkgray border-2 rounded-l-md h-[90%] text-black dark:text-white" type="text" onChange={(e) => setAnswer(e.target.value)} value={answer} 
        onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevent default form submission behavior
              handleAddMessage(); // Trigger the same action as the button click
            } }}
        />
        <button onClick={async ()=> await handleAddMessage()} className="w-12 h-12 rounded-r-md border-y-2 border-r-2 bg-gray-100 hover:bg-gray-200 h-[90%] my-1 mr-8">
          <Send size={16} className="text-gray-600 dark:text-icongray mx-3" />
        </button>
      </div>
    </div>
    )
}

export default InterviewBody