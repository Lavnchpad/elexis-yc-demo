
import axios from "axioss";
import React, { createContext, useEffect, useState } from "react";

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
  const [interviewData, setInterviewData] = useState([])
   const [candidateId, setCandidateId] = useState(null);
   const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true); // loading state for interviews

  const fetchInterviewDetails = async (candidateId) => {
    try {
      setLoading(true); // Set loading to true before fetching
      const response = await axios.get(`/interviews/?candidate_id=${candidateId}`);
      const data = response.data;
      const filteredData = data.filter((interview) => interview.candidate.id === candidateId);
      setInterviewData(filteredData);
      if (data.length > 0) {
        setSelectedJob(filteredData); // Default job selection
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    setInterviewData([]); // Reset interview data when candidateId changes
    if (candidateId) {
      // Fetch interview details only when candidateId is selected
      fetchInterviewDetails(candidateId);
    }
  }, [candidateId]);
  ;

  return (
    <InterviewContext.Provider value={{ interviewData, setInterviewData, fetchInterviewDetails, setSelectedJob, interviewDataLoading: loading, candidateId, setCandidateId, selectedJob }}>
      {children}
    </InterviewContext.Provider>
  );
};