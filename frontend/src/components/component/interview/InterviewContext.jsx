
import axios from "../../../utils/api";
import React, { createContext, useEffect, useState } from "react";

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
  const [interviewData, setInterviewData] = useState([])
   const [candidateId, setCandidateId] = useState(null);
   const [selectedJob, setSelectedJob] = useState(null);

  const fetchInterviewDetails = async (candidateId) => {
    try {
      const response = await axios.get(`/interviews/?candidate_id=${candidateId}`);
      const data = response.data;
      const filteredData = data.filter((interview) => interview.candidate.id === candidateId);
      setInterviewData(filteredData);
      if (data.length > 0) {
        setSelectedJob(filteredData); // Default job selection
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  useEffect(() => {
    if (candidateId) {
      // Fetch interview details only when candidateId is selected
      fetchInterviewDetails(candidateId);
    }
  }, [candidateId]);
  ;

  return (
    <InterviewContext.Provider value={{ interviewData,setInterviewData, fetchInterviewDetails,setSelectedJob }}>
      {children}
    </InterviewContext.Provider>
  );
};