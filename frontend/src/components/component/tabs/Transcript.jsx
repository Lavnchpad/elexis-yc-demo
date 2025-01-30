import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Transcript = ({ interview_transcript }) => {
  return (
    <div className="w-full">
      <Accordion type="single" collapsible className="w-full">
        {interview_transcript.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {item.interview}
            </AccordionTrigger>
            <AccordionContent>
              {item.candidate}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Transcript;
