import React, { useEffect, useRef } from 'react';
import Message from './Message'; // Adjust the import path if necessary

const InterviewBody = () => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom);

  return (
    <div className="flex flex-col h-full w-full text-sm overflow-y-auto relative rounded-lg">
      <Message from="user" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique." />
      {/* <Message from="computer" text="Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet." /> */}
      {/* Add more <Message /> components as needed */}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default InterviewBody;
