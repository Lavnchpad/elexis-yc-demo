import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import mammoth from "mammoth";

const Transcript = () => {
  const { selectedCandidate } = useOutletContext();
  const [qaData, setQaData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTranscript = async () => {
      // Check if the transcript URL exists
      if (!selectedCandidate?.transcript) {
        setError("No transcript available for this candidate.");
        return;
      }
      try {
        // Fetch the .docx file
        const response = await axios.get(selectedCandidate.transcript, {
          responseType: "arraybuffer",
        });
        // Parse the .docx content
        const { value: rawText } = await mammoth.extractRawText({
          arrayBuffer: response.data,
        });
         // Convert raw text into structured Q&A data
         const lines = rawText.split("\n").filter(Boolean); 
         const parsedData = lines.reduce((acc, line, index) => {
           if (line.startsWith("Question:")) {
             acc.push({ question: line.replace("Question:", "").trim(), answer: "" });
           } else if (line.startsWith("Answer:") && acc.length > 0) {
             acc[acc.length - 1].answer = line.replace("Answer:", "").trim();
           }
           return acc;
         }, []);
         setQaData(parsedData);
        } catch (err) {
          console.error("Error fetching or processing transcript:", err);
          setError("Failed to process the transcript file.");
        }
      };
      fetchTranscript();
    }, [selectedCandidate]);
  
    return (
      <div className="w-full">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : qaData.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {qaData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-gray-500">Loading transcript data...</p>
        )}
    </div>
  )
}

export default Transcript
