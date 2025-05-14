import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Transcript = ({ interview_transcript_url}) => {
  const [transcript , setTranscript] = useState([])
  useEffect(()=>{
    (async()=>{
      if(interview_transcript_url){
        const response = (await fetch(interview_transcript_url));
        if(response.ok){
          const trancriptResponse =  await response.json()
          if(Array.isArray(trancriptResponse)){
            setTranscript(trancriptResponse);
          }
        }
      }
    })()
  },[interview_transcript_url])
  return (
    <div className="w-full">
      <Accordion type="single" collapsible className="w-full">
        {transcript?.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Transcript;
