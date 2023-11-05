import React, { useEffect, useRef, useState } from "react";
import Message from "./Message"; // Adjust the import path if necessary
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import {fetchEventSource} from "@microsoft/fetch-event-source"
import { API_URL } from "../../../../consts";
import { flushSync } from "react-dom";
import { getChatHistory } from "@/datafetch";

interface InterviewBodyProps {
  questionId: string;
  userId: string;
  token: string
}
type MessageType = {
  from: string;
  text: string;
}
const DEFAULT_MESSAGE = {from: "computer", text: "This is where you should type your answers"}
const InterviewBody: React.FC<InterviewBodyProps> = ({
  questionId,
  userId,
  token,
}) => {
 
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
  // if (data) {
  //   setMessages(data)
  // }

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
    <div className="h-full w-full text-sm  relative rounded-lg overflow-y-hidden">
     <div className="flex h-[100%] flex-col overflow-y-scroll">
     {messages && messages.map((message: MessageType, ix: number)=>(
      <Message from={message.from} text={message.text}></Message>
     ))}
      <div className="h-full  pb-24 " ref={messagesEndRef}></div>
     </div>
      <div className="absolute flex flex-row bottom-0 w-full h-12">
        <input
          className="flex-1 px-8 bg-neutral-100 border-y border-neutral-300 h-full text-black"
          type="text"
          onChange={(e) => setAnswer(e.target.value)}
          value={answer}
        />
        <button onClick={async ()=> await handleAddMessage()}className="w-32 h-12 rounded-md bg-blue-500">Send</button>
      </div>
    </div>
  );
};

export default InterviewBody;
