import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ExpandedTranscript = ({ interview_transcript_url}) => {
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
    <Card className="w-full">
        <CardHeader>
            <CardTitle>
                Transcript
            </CardTitle>
        </CardHeader>
      <CardContent>
        {transcript?.map((item, index) => (
          <div key={index} value={`item-${index}`}>
            <div className="text-left font-bold">
              {item.question}
            </div>
            <div>
              {item.answer}
            </div>
          </div>
        ))}
        {
            transcript.length == 0?
            <>Transcript not available</>
            :<></>
        }
      </CardContent>
    </Card>
  );
};

export default ExpandedTranscript;
