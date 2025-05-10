
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
   const [interviewData, setInterviewData] = useState([]);
   const [candidateId, setCandidateId] = useState(null);
   const [selectedJob, setSelectedJob] = useState(null);

  const fetchInterviewDetails = async (candidateId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/interviews/?candidate_id=${candidateId}`, {
        headers: { 
            Authorization: `Bearer ${token}`, },
            'Content-Type': 'application/json',
      });
      const data = await response.data;
      console.log(data)
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